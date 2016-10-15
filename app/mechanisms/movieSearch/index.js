/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import { call, select, put } from 'redux-saga/effects';

import request from 'utils/request';
import { selectFilters } from 'containers/FilterForm/selectors';
import { selectResult } from 'containers/RequestMovie/selectors';

import randomizePage from './randomizePage';
import { rankMovies } from './analyseMovie';
import { buildUrl } from './buildUrl';
import { validateAndPrepareParams } from './extractParams';


/**
 * extractParams
 * @desc Randomize single, unique number from collection.
 * - if we need params
 * - if we want params but there is no page set (getting genre list example)
 */
export function* buildParams(filters, higherParams = {}, withParams, randomPage) {
  let setParams = {};
  if (withParams) {
    setParams = validateAndPrepareParams(filters, higherParams, randomPage);
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
  if (withParams) {
    randomPage = yield randomizePage(filters);
  }

  const params = yield buildParams(filters, higherParams, withParams, randomPage);
  const url = yield buildUrl(params, endPoint);

  const data = yield call(request, url);

  return data;
}


/**
 * processMovieAnalyse
 * @desc Ranks our movies in condition of selecting best upcoming result
 *
 * - if we need randomPage
 */
export function* processMovieAnalyse() {
  const { notSorted, pending } = yield select(selectResult());
  const { range } = yield select(selectFilters());
  debugger;
  return rankMovies(notSorted, pending, range);
}

export function* detectPending() {
  const { pending } = yield select(selectResult());
  const { range } = yield select(selectFilters());

  const cacheLength = range.pagesCache !== null ? range.pagesCache.length : undefined;

  console.log('pending movies length: ' + pending.length, 'New page: ' + (range.pages === cacheLength || pending.length < 30 ), 'all pages: ' + range.pages, 'Visited pages: ' + cacheLength);
  // Check if there are still pages we can iterate

  const isOutOfPages = cacheLength === 0 && pending.length >= 1;
  if (isOutOfPages) return true; // and run through pending list
  // Check is there is more pending 'results' than 30
  return (pending.length > 30);
}

