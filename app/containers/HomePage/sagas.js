import { take, call, select, put, cancel, fork } from 'redux-saga/effects';
import { GET_GENRES_LIST, FILTER_FORM_UPDATE, apiUrl, apiKey } from 'containers/App/constants';
import { selectFilters } from 'containers/App/selectors';
import { resultSet, genreListSetSuccess } from 'containers/App/actions';
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
  const requestUrl = `${apiUrl}/discover/movie?${apiKey}&with_genres=${filters.genre.id}&page=${randomPage}`;

  // If url construction failed
  if (!requestUrl) return;
  const movies = yield call(request, requestUrl);
  if (!movies.err) {
    yield put(resultSet(movies.data, movies.data.results[0]));
  }
}

// // Individual exports for testing
export function* getGenreList() {
  // Select username from store
  // const filters = yield select(selectFilters());
  const requestUrl = `${apiUrl}/genre/movie/list?${apiKey}`;
  const genres = yield call(request, requestUrl);
  console.log(genres.data.genres);
  if (!genres.err) {
    yield put(genreListSetSuccess(genres.data.genres));
  }
}

/**
 * Watches for LOAD_REPOS action and calls handler
 */
export function* getMovieWatcher() {
  while (yield take(FILTER_FORM_UPDATE)) {
    yield call(getMovie);
  }
}

export function* getGenresListWatcher() {
  while (yield take(GET_GENRES_LIST)) {
    yield call(getGenreList);
  }
}

export function* getMovieData() {
  // Fork watcher so we can continue execution
  const watcher = yield fork(getMovieWatcher);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


export function* getGenresListData() {
  // Fork watcher so we can continue execution
  const watcher = yield fork(getGenresListWatcher);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

/**
 * Root saga manages watcher lifecycle
 */

// Bootstrap sagas
export default [
  getMovieData,
  getGenresListData,
];