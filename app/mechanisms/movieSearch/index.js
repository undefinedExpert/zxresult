/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import { call, select } from 'redux-saga/effects';

import request from 'utils/request';
import { selectFilters } from 'containers/FilterForm/selectors';
import { selectResult } from 'containers/RequestMovie/selectors';

import randomizePage from './randomizePage';
import { rankMovies } from './analyseMovie';
import { buildUrl } from './buildUrl';
import { constructParams } from './extractParams';


/**
 * extractParams
 * @desc Randomize single, unique number from collection.
 * - if we need params
 * - if we want params but there is no page set (getting genre list example)
 */
export function* buildParams(filters, higherParams = {}, withParams, randomPage) {
  let setParams = {};
  if (withParams) {
    setParams = constructParams(filters, higherParams, randomPage);
  }

  if (!setParams.page && withParams) return null;

  return setParams;
}


/**
 * callToApi
 * @desc Makes API request from current filters options (if withParams set true). It provides an easy way of building final API url
 * which then is used in our call.
 *
 * @param {string} endPoint - What is the endpoint of our API
 * @param {object} higherParams - Does we need to set 'hardcoded' param?
 * @param {boolean} withParams - does this call need params?
 *
 * - if we need randomPage
 */
export function* callToApi(endPoint, higherParams = {}, withParams = true) {
  const filters = yield select(selectFilters());

  let randomPage;
  if (withParams) randomPage = yield randomizePage(filters);

  const params = yield buildParams(filters, higherParams, withParams, randomPage);
  const url = yield buildUrl(params, endPoint);

  return yield call(request, url);
}


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
  const { pending } = yield select(selectResult());
  const { range } = yield select(selectFilters());

  let cacheLength;
  if (range.pagesCache !== null) {
    cacheLength = range.pagesCache.length;
  }

  console.info(`pending movies length: ${pending.length}`);
  console.info(`What is the new page: ${(range.pages === cacheLength || pending.length < 30)}`);
  console.info(`All pages: ${range.pages}`, `Visited pages: ${cacheLength}`);

  if (cacheLength === 0 && pending.length >= 1) return true;

  // Check is there is more pending 'results' than 30
  return (pending.length > 30);
}

