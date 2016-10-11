import { take, call, put, cancel, fork, race } from 'redux-saga/effects';
import { updateFilterGenre } from './actions';
import { callToApi } from 'mechanisms/movieSearch';
import * as CONSTANT from 'containers/MovieSearchForm/constants';
import { LOCATION_CHANGE } from 'react-router-redux';


// Individual exports for testing
export function* getGenreList() {
  console.log('saga ran')
  const { data } = yield callToApi('/genre/movie/list', {}, false);
  try {
    yield put(updateFilterGenre.list.success(data.genres));
  }
  catch (err) {
    yield put(updateFilterGenre.list.failure(err));
  }
}

export function* getGenresListWatcher() {
  while (yield take(CONSTANT.UPDATE_FILTER_GENRE_LIST.REQUEST)) {
    yield call(getGenreList);
  }
}

export function* getMovieSagas() {
  const genreListWatcher = yield fork(getGenresListWatcher);


  yield take(LOCATION_CHANGE);

  yield race([
    cancel(genreListWatcher),
  ]);
}

export default [
  getMovieSagas,
];
