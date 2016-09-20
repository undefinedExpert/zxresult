import { take, call, select, put, cancel, fork, race } from 'redux-saga/effects';
import * as CONSTANT from 'containers/App/constants';
import { selectFilters, selectResult } from 'containers/App/selectors';
import { updateMovieResult, updateFilterGenre, updateFilters } from 'containers/App/actions';
import request from 'utils/request';
import { buildUrlParams } from 'utils/helpers';
import { buildParams } from 'mechanisms/searchMovie';
import { LOCATION_CHANGE, push } from 'react-router-redux';

// Get movie
export function* getMovie() {
  const filters = yield select(selectFilters());
  const result = yield select(selectResult());

  const prepareParams = yield buildParams(filters, result, '/discover/movie');

  // const randomPage = randomizePage(result);
  // const params = {
  //   with_genres: filters.genre.active.id,
  //   page: randomPage,
  //   'primary_release_date.gte': `${filters.decade.active.rangeMin}`,
  //   'primary_release_date.lte': `${filters.decade.active.rangeMax}`,
  // };
  //
  // const requestUrl = yield buildUrlParams(params);
  const movies = yield call(request, prepareParams);

  if (!movies.err && movies.data.results[0]) {
    yield console.info('Update result');
    yield console.info(movies.data.results[0]);
    yield put(updateMovieResult.success(movies.data, movies.data.results[0]));
  }
  else {
    // console.error('---------INFO-------');
    // console.log(requestUrl);
    // console.log(movies);
    // console.error('--------------------');
    yield put(updateMovieResult.failure(movies.err));
  }
}

// Individual exports for testing
export function* getGenreList() {
  // const filters = yield select(selectFilters());
  const requestUrl = `${CONSTANT.apiUrl}/genre/movie/list?${CONSTANT.apiKey}`;
  const genres = yield call(request, requestUrl);
  if (!genres.err) {
    yield put(updateFilterGenre.list.success(genres.data.genres));
  }
}

// Update filters have make a request to server
export function* getUpdateFilters() {
  // console.log('get update filters');
  // TODO: if maxResults value hasn't change return nothing
  const filters = yield select(selectFilters());
  const latestApiPage = 1000;
  // const storeResult = yield select(selectResult());
  // Fixme: Bug #2 Cannot read property of null (filters.genre.active.id)
  const params = {
    with_genres: filters.genre.active.id,
    page: latestApiPage, // latest page from api
    'primary_release_date.gte': `${filters.decade.active.rangeMin}`,
    'primary_release_date.lte': `${filters.decade.active.rangeMax}`,
    'vote_count.gte': 100,
  };

  const requestUrl = yield buildUrlParams(params);
  const result = yield call(request, requestUrl);
  const maxResults = result.data.total_pages;
  if (!result.err) {
    console.log(maxResults);
    console.log(result.data.total_results);
    yield put(updateFilters.success(maxResults));
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
