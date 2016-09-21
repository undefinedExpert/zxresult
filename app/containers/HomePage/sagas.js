import { take, call, select, put, cancel, fork, race } from 'redux-saga/effects';
import * as CONSTANT from 'containers/App/constants';
import { selectFilters, selectResult } from 'containers/App/selectors';
import { updateMovieResult, updateFilterGenre, updateFilters } from 'containers/App/actions';
import request from 'utils/request';
import { buildUrlFromFilters } from 'mechanisms/movieSearch';
import { LOCATION_CHANGE, push } from 'react-router-redux';

// Get movie
function* callToApi(endPoint, HigherParams, withParams = true) {
  const filters = yield select(selectFilters());
  const result = yield select(selectResult());
  const prepareParams = yield buildUrlFromFilters(filters, result, endPoint, HigherParams, withParams);
  const data = yield call(request, prepareParams);
  return data;
}

export function* getMovie() {
  const called = yield callToApi('/discover/movie');
  try {
    yield console.info('Update result');
    yield put(updateMovieResult.success(called.data, called.data.results[0]));
  }
  catch (err) {
    yield put(updateMovieResult.failure(called.err));
  }
}

// Individual exports for testing
export function* getGenreList() {
  const called = yield callToApi('/genre/movie/list', {}, false);
  try {
    yield put(updateFilterGenre.list.success(called.data.genres));
  }
  catch (err) {
    yield put(updateFilterGenre.list.failure(err));
  }
}

// Update filters have make a request to server
export function* getUpdateFilters() {
  const called = yield callToApi('/discover/movie', { page: 1000 });
  const allPages = called.data.total_pages;
  const allResults = called.data.total_results;
  try {
    console.log(`Total pages: ${allPages}`);
    console.log(`Total Results: ${allResults}`);
    yield put(updateFilters.success(allResults));
  }
  catch (err) {
    yield put(updateFilters.failure(err));
  }
}

export function* getUpdateUrl() {
  // TODO: Refactor, turn it on
  // yield put(push('/result'));
  // TEMPORARY OFF
}

/**
 * Watches for FILTER_FORM_UPDATE action and calls handler
 */
export function* getMovieWatcher() {
  while (yield take(CONSTANT.UPDATE_MOVIE_RESULT.REQUEST)) {
    yield call(getMovie);
  }
}

export function* getGenresListWatcher() {
  while (yield take(CONSTANT.UPDATE_FILTER_GENRE_LIST.REQUEST)) {
    yield call(getGenreList);
  }
}

export function* getResultChangeWatcher() {
  while (yield take(CONSTANT.UPDATE_MOVIE_RESULT.SUCCESS)) {
    yield call(getUpdateUrl);
  }
}

export function* getUpdateFiltersWatcher() {
  while (yield take(CONSTANT.UPDATE_FILTERS.REQUEST)) {
    yield call(getUpdateFilters);
  }
}

export function* getData() {
  // Fork watcher so we can continue execution
  const moviesWatcher = yield fork(getMovieWatcher);
  const updateUrl = yield fork(getResultChangeWatcher);
  const genreListWatcher = yield fork(getGenresListWatcher);
  const updateFilterWatcher = yield fork(getUpdateFiltersWatcher);

  // Suspend execution until location changes
  // TODO: Change this to custom action, when the user request new 'result' or something like this.
  // The main reason of that is to not rely on LOCATION_CHANGE event becouse we 'actually' dosen't change the location on the result subpage
  // we just get new data.
  yield take(LOCATION_CHANGE);
  yield race([
    cancel(moviesWatcher),
    cancel(updateUrl),
    cancel(genreListWatcher),
    cancel(updateFilterWatcher),
  ]);
}

/**
 * Root saga manages watcher lifecycle
 */

// Bootstrap sagas
export default [
  getData,
];
