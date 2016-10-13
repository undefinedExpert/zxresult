/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import { random, range as numRange } from 'lodash';
import { put } from 'redux-saga/effects';
import { fromJS } from 'immutable';

import { cacheRandomizedPage } from 'containers/FilterForm/actions';


/**
 * pickRandom
 * @desc Randomize single, unique number from collection.
 * Creates preFilled array, makes copy of it with a shuffle. Returns random element and removes it from our collection so we can
 * push updated collection into our cache.
 *
 * @param {number} collectionSize - Current range of pages, basing on filters
 * @param {array|null} cache - What pages we still can pick
 *
 * - if this func runs for the first time
 * - if preFilled array not exist
 * - if filters update occur
 * - if there is no more pages to review
 */
const pickRandom = (collectionSize, cache) => {
  // TODO: Because of our filterDomain -> filter selector returns the JS version of an object (immutable .toJS)
  // We've to revoke that process in this function, fix that at future.
  let whatLeft = cache === null ? cache : fromJS(cache);

  if (typeof pickRandom.oldCollectionSize === 'undefined') {
    pickRandom.oldCollectionSize = collectionSize;
  }

  if (typeof pickRandom.preFilled === 'undefined') {
    pickRandom.preFilled = fromJS(numRange(collectionSize));
  }

  if (pickRandom.oldCollectionSize !== collectionSize || whatLeft === null) {
    pickRandom.oldCollectionSize = collectionSize;
    whatLeft = pickRandom.preFilled.sortBy(() => Math.random());
  }

  const maxRange = whatLeft.size > 1000 ? 1000 : whatLeft.size;

  if (whatLeft && whatLeft.size === 0) return null;

  const randomNumber = random(1, maxRange);
  const randomNumberIndex = whatLeft.indexOf(randomNumber);
  const whatLeftMinusRandom = whatLeft.remove(randomNumberIndex);

  return { number: randomNumber, cache: whatLeftMinusRandom };
};


/**
 * randomizePage
 * @desc Random single page from our potential range values. Store updated collection in store as cache.
 * @param {Object} range - Filter selector, allows us to determine what is the cache and collection size
 *
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
