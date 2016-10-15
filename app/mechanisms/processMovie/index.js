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
 * - if pagesCache contains values
 * - if there is no more pages and we still got some items in our pending list
 * - if we need download new page or not (if length of pending is smaller then 30 then yes we need)
 * // TODO: remove debugging information
 */
export function* detectPending() {
  console.clear();
  const { pending } = yield select(selectResult());
  const { range } = yield select(selectFilters());

  const cacheLength = range.pagesCache !== null ? range.pagesCache.length : undefined;

  console.log('pending movies length: ' + pending.length, 'New page: ' + (range.pages === cacheLength || pending.length < 30 ), 'all pages: ' + range.pages, 'Visited pages: ' + cacheLength);
  // Check if there are still pages we can iterate

  const isOutOfPages = cacheLength === 0 && pending.length > 1;
  if (isOutOfPages) return true; // and run through pending list
  // Check is there is more pending 'results' than 30
  return (pending.length > 30);
}

