import { take, call, select, put, cancel, fork } from 'redux-saga/effects';
import * as CONSTANT from 'containers/App/constants';
import { selectFilters } from 'containers/App/selectors';
import { resultSet, updateFilterGenre } from 'containers/App/actions';
import request from 'utils/request';
import Chance from 'chance';
import { LOCATION_CHANGE } from 'react-router-redux';


// Individual exports for testing
function randomizePage() {
  const chance = new Chance();
  return chance.integer({ min: 0, max: 893 });
}

export function* getMovie() {
  console.info('sagas run');
  const filters = yield select(selectFilters());
  const randomPage = randomizePage();

  const requestUrl = `${CONSTANT.apiUrl}/discover/movie?${CONSTANT.apiKey}&with_genres=${filters.genre.active.id}&page=${randomPage}`;
  const movies = yield call(request, requestUrl);
  if (!movies.err) {
    yield put(resultSet(movies.data, movies.data.results[0]));
  }
}

// // Individual exports for testing
export function* getGenreList() {
  // const filters = yield select(selectFilters());
  const requestUrl = `${CONSTANT.apiUrl}/genre/movie/list?${CONSTANT.apiKey}`;
  const genres = yield call(request, requestUrl);
  console.log(genres);
  if (!genres.err) {
    yield put(updateFilterGenre.list.success(genres.data.genres));
  }
}

/**
 * Watches for LOAD_REPOS action and calls handler
 */
export function* getMovieWatcher() {
  while (yield take(CONSTANT.FILTER_FORM_UPDATE)) {
    yield call(getMovie);
  }
}

export function* getGenresListWatcher() {
  while (yield take(CONSTANT.UPDATE_FILTER_GENRE_LIST.REQUEST)) {
    yield call(getGenreList);
  }
}

export function* getData() {
  // Fork watcher so we can continue execution
  const moviesWatcher = yield fork(getMovieWatcher);
  const genreListWatcher = yield fork(getGenresListWatcher);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(moviesWatcher);
  yield cancel(genreListWatcher);
}

/**
 * Root saga manages watcher lifecycle
 */

// Bootstrap sagas
export default [
  getData,
];
