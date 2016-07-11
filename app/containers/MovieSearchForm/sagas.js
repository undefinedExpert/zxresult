import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { selectFilters } from 'containers/App/selectors';
import { GET_GENRES_LIST, GET_GENRES_LIST_SUCCESS, GET_GENRES_LIST_ERR, apiUrl, apiKey } from 'containers/App/constants';
import { genreListSetSuccess } from 'containers/App/actions';

import { LOCATION_CHANGE } from 'react-router-redux';
import { resultSet } from 'containers/App/actions';

import request from 'utils/request';

// // Individual exports for testing
export function* getGenreList() {
  // Select username from store
  // const filters = yield select(selectFilters());
  const requestUrl = `${apiUrl}/genre/movie/list?${apiKey}`;
  const genres = yield call(request, requestUrl);

  if (!genres.err) {
    yield put(genreListSetSuccess(genres));
  }
}
//
// /**
//  * Watches for LOAD_REPOS action and calls handler
//  */
export function* getGenresListWatcher() {
  while (yield take(GET_GENRES_LIST)) {
    yield call(getGenreList);
  }
}

// All sagas to be loaded
export default [
  getGenresListWatcher,
];
