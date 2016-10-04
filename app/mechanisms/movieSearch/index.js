import { call, select, put, cancel } from 'redux-saga/effects';
import { buildUrlParams } from './buildUrl';
import { validateAndPrepareParams, generateNumber } from './extractParams';
import { rankMovies } from './analyseMovie';
import { selectFilters, selectResult } from 'containers/App/selectors';
import { cacheRandomizedPage } from 'containers/App/actions';
import request from 'utils/request';

export function* buildUrlFromFilters(filters, endpoint, higherParams = {}, withParams, randomPage) {
  const setParams = yield withParams ? validateAndPrepareParams(filters, higherParams, randomPage) : {};
  const requestUrl = yield buildUrlParams(setParams, endpoint);
  if (!setParams.page && withParams) return null;
  return requestUrl;
}

// Randomize page depending on max resultRange
export function* randomizePage(storeParams) {
  // Cache all randomized numbers in array, so the randomize function won't select (randomize) then once again
  // We don't want to do that, cause our application analyse each page and takes 5 best results from it
  // And if we met same page again the end user might see the same result.
  // debugger;
  const cache = storeParams.range.pagesCache;
  const pages = storeParams.range.pages;
  const maxRange = pages > 1000 ? 1000 : pages;
  const maxPage = pages ? maxRange : 1;
  let randomNumber = yield generateNumber(1, maxPage);

  if (maxPage === cache.length) {
    console.error('user saw all pages');
    return null;
  }
  while (cache.indexOf(randomNumber) !== -1) {
    yield randomNumber = generateNumber(1, maxPage);
  }
  const cached = cache.concat(randomNumber);
  yield put(cacheRandomizedPage.request(cached));
  return randomNumber;
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
  console.log('pending movies length: ' + pending.length, 'New page: ' + (pending.length < 30 || range.pages === range.pagesCache.length), 'all pages: ' + range.pages, 'Visited pages: ' + range.pagesCache.length);
  // Check if there are still pages we can iterate
  const isOutOfPages = range.pages === range.pagesCache.length && pending.length > 1;
  if (isOutOfPages) return true; // and run through pending list
  // Check is there is more pending 'results' than 30
  return (pending.length > 30);
}

