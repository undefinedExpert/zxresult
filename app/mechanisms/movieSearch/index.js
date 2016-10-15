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
import { buildUrlParams } from './buildUrl';
import { validateAndPrepareParams, generateNumber } from './extractParams';


export function* buildUrlFromFilters(filters, endpoint, higherParams = {}, withParams, randomPage) {

  const setParams = yield withParams ? validateAndPrepareParams(filters, higherParams, randomPage) : {};

  const requestUrl = yield buildUrlParams(setParams, endpoint);


  if (!setParams.page && withParams) return null;

  return requestUrl;
}


export function* callToApi(endPoint, higherParams = {}, withParams = true) {
  const filters = yield select(selectFilters());
  let randomPage;
  if (withParams && !higherParams.page) randomPage = yield randomizePage(filters, higherParams);
  const prepareParams = yield buildUrlFromFilters(filters, endPoint, higherParams, withParams, randomPage);
  const data = yield call(request, prepareParams);
  if (!prepareParams) return false;

  return data;
}


export function* processMovieAnalyse() {
  const { notSorted, pending } = yield select(selectResult());
  const { range } = yield select(selectFilters());
  const upcomingResults = notSorted.results;
  // Remove worthless movies from pendingList
  // if (pending.length > 110) pending.length -= 40; // 105 - 40 = 65
  return rankMovies(upcomingResults, pending, range);
}

export function* detectPending() {
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

