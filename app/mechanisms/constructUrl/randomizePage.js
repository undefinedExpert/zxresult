/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import { fromJS } from 'immutable';
import { put } from 'redux-saga/effects';
import { range as numRange } from 'lodash';

import { cacheRandomizedPage } from 'containers/FilterForm/actions';


/**
 * pickRandom
 * @desc Randomize single, unique number from collection.
 * Creates preFilled array, makes a copy of it with a shuffle. Returns random element and removes it from our collection so we can
 * push updated collection into our cache.
 *
 * TODO: Refactor this func to be a generator.
 * @param {Number} collectionSize - Current range of pages, basing on filters
 * @param {Array|null} cache - What pages we still can pick
 *
 * - if there is no more pages to review
 * - if this func runs for the first time
 * - if preFilled array not exist
 * - if collection size > 1000
 * - if filters update occur
 *
 */
export const pickRandom = (collectionSize, cache) => {
  // TODO: Because of our filterDomain -> filter selector returns the JS version of an object (immutable .toJS)
  // We've to revoke that process in this function, fix that at future.
  let whatLeft = cache === null ? cache : fromJS(cache);
  let limitedSize;

  if (whatLeft && whatLeft.size === 0) return null;

  if (typeof pickRandom.oldCollectionSize === 'undefined') {
    pickRandom.oldCollectionSize = collectionSize;
  }

  if (typeof pickRandom.preFilled === 'undefined') {
    pickRandom.preFilled = fromJS(numRange(1, 1000));
  }

  if (collectionSize > 1000) {
    limitedSize = 999;
  }

  if (pickRandom.oldCollectionSize !== collectionSize || whatLeft === null) {
    const maxRange = limitedSize || collectionSize;
    const currentRange = pickRandom.preFilled.setSize(maxRange);
    pickRandom.oldCollectionSize = collectionSize;

    whatLeft = currentRange.sortBy(() => Math.random());
  }

  const randomNumber = whatLeft.first();
  const randomNumberIndex = whatLeft.indexOf(randomNumber);
  const whatLeftMinusRandom = whatLeft.remove(randomNumberIndex);

  return { number: randomNumber, cache: whatLeftMinusRandom };
};


/**
 * randomizePage
 * @desc Takes random page number from our potential range of values (cache). After pick, updates collection
 * @param {Object} range - Filter selector, allows us to determine what is the cache and collection size
 * TODO: This func should work like DetectPending, move return state from generator
 * - if picked is null then there is no more pages to review so we return null
 */
export default function* randomizePage({ range }) {
  const cache = range.pagesCache;
  const collectionSize = range.pages;

  const picked = yield pickRandom(collectionSize, cache);
  if (picked === null) return null;

  yield put(cacheRandomizedPage.request(picked.cache));

  return picked.number;
}
