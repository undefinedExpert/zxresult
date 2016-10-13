/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import { random, range as numrange } from 'lodash';
import { put } from 'redux-saga/effects';
import { fromJS } from 'immutable';

import { cacheRandomizedPage } from 'containers/FilterForm/actions';



const pickRandom = (collection, cache) => {
  // TODO: Because of our filterDomain -> filter selector returns the JS version of an object (immutable .toJS)
  // We've to revoke that process in this function, fix that at future.
  console.log(cache);
  let whatLeft = cache === null ? cache : fromJS(cache);
  // check oldCollection were initialized
  if (typeof pickRandom.oldCollection === 'undefined') {
    pickRandom.oldCollection = collection;
  }

  if (typeof pickRandom.preFilled === 'undefined') {
    pickRandom.preFilled = fromJS(numrange(collection));
  }

  // is oldCollection is different then our old collection?
  // if yes then we assume filters change
  // we are setting old collection into new collection,
  // we are picking a copy of prefilled and shuffle it.
  // then randomize page
  // if no next
  if (pickRandom.oldCollection !== collection || whatLeft === null) {
    pickRandom.oldCollection = collection;
    whatLeft = pickRandom.preFilled.sortBy(() => Math.random());
  }

  // const maxRange = whatLeft.size > 1000 ? 1000 : whatLeft.size;
  const maxRange = whatLeft.size > 1000 ? 1000 : whatLeft.size;

  if (whatLeft && whatLeft.size === 0) return null;

  const randomNumber = random(1, maxRange);
  const randomNumberIndex = whatLeft.indexOf(randomNumber);
  const whatLeftMinusRandom = whatLeft.remove(randomNumberIndex);

  return { number: randomNumber, cache: whatLeftMinusRandom };
};


// Randomize page depending on max resultRange
export default function* randomizePage({ range }) {
  console.time("random");
  // Cache all randomized numbers in array, so the randomize function won't select (randomize) then once again
  // We don't want to do that, cause our application analyse each page and takes 5 best results from it
  // And if we met same page again the end user might see the same result.
  const cache = range.pagesCache;
  const collection = range.pages;

  // 0. Check if pages remains the same
  // 1. fill array if not already filled
  // 2. take random value from that array
  // 3. Remove just picked value

  const picked = yield pickRandom(collection, cache);

  if (picked === null) return null;

  yield put(cacheRandomizedPage.request(picked.cache));
  console.timeEnd("random");
  return picked.number;
}
