/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import { select } from 'redux-saga/effects';

import { selectFilters } from 'containers/FilterForm/selectors';
import { selectResult } from 'containers/RequestMovie/selectors';

import { rankMovies } from './analyseMovie';

/**
 * processMovieAnalyse
 * @desc Ranks our movies in condition of selecting best upcoming result
 */
export function* processMovieAnalyse() {
  const { notSorted, pending } = yield select(selectResult());
  const { range } = yield select(selectFilters());

  return rankMovies(notSorted, pending, range);
}


/**
 * detectPending
 * @desc Detect if we need to download new page or push pending
 *
 * - if our cache is in initial state then we download page (check todo)
 * - if we have cache values - page to download - and our pending list is bigger then 0 but smaller then 30 we download page
 * - if we don't contain page we decide to push items from pending list until last item
 * - return null, cause we don't have any movie left.
 *
 * TODO: Make something when there is no cache, and we does not contain any 'page' to download
 * TODO: remove debugging information
 */
export function* detectPending() {
  const { pending } = yield select(selectResult());
  const { range } = yield select(selectFilters());

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

