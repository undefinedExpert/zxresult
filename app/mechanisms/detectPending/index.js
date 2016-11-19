/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import { select, call } from 'redux-saga/effects';

import { selectFilters } from 'containers/FilterForm/selectors';
import { selectResult } from 'containers/RequestMovie/selectors';


/**
 * detector
 * @desc Detect if we need to download new page or push pending
 * - if our cache is in initial state then we download page (check todo)
 * - if we have cache values - page to download - and our pending list is bigger then 0 but smaller then 30 we download page
 * - if we don't contain page we decide to push items from pending list until last item
 *
 * TODO: Make something when there is no cache, and we do not contain any 'page' to download
 * TODO: remove debugging information
 * - false - download page
 * - true - push pending
 * - null - no more results
 * @return {Null | Boolean}, cause we don't have any movie left.
 */
export function detector({ pending, range }) {
  if (range.pagesCache === null) {
    return false;
  }

  const cacheLength = range.pagesCache.length;
  console.info(`pending movies length: ${pending.length}`);
  console.info(`What is the new page: ${(range.pages === cacheLength || pending.length < 30)}`);
  console.info(`All pages: ${range.pages}`, `Visited pages: ${cacheLength === 0 ? 1 : cacheLength}`);

  if (cacheLength > 0 && pending.length < 30) {
    return false;
  }
  else if (pending.length >= 1) {
    return true;
  }

  return null;
}


/**
 * detectPending
 * @desc provide pending, range for our detector function
 * @return {Null | Boolean} status - Does we need to download a page, push pending, or we don't have movies to display?
 */
export function* detectPending() {
  const { pending } = yield select(selectResult());
  const { range } = yield select(selectFilters());
  const status = yield call(detector, { pending, range });
  return status;
}
