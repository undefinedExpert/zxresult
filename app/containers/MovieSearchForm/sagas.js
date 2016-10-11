import { take, call, put, cancel, fork, race } from 'redux-saga/effects';
import { updateFilterGenre, updateFilters } from './actions';
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

// Update filters have make a request to server
export function* handleUpdateFilters() {
  const { data } = yield callToApi('/discover/movie', { page: 1000 });
  try {
    console.log(`Total pages: ${data.total_pages}`);
    console.log(`Total Results: ${data.total_results}`);
    yield put(updateFilters.success(data.total_pages, data.total_results));
  }
  catch (err) {
    yield put(updateFilters.failure(err));
  }
}

/*
* WATCHERS
* */

export function* getUpdateFiltersWatcher() {
  while (yield take(CONSTANT.UPDATE_FILTERS.REQUEST)) {
    yield call(handleUpdateFilters);
  }
}

export function* getGenresListWatcher() {
  while (yield take(CONSTANT.UPDATE_FILTER_GENRE_LIST.REQUEST)) {
    yield call(getGenreList);
  }
}


// EXPORT

export function* getMovieSagas() {
  const getGenresList = yield fork(getGenresListWatcher);
  const getUpdateFilters = yield fork(getUpdateFiltersWatcher);

  // Suspend execution until location changes
  // TODO: Change this to custom action, when the user request new 'result' or something like this.
  // The main reason of that is to not rely on LOCATION_CHANGE event because we 'actually' dose not change the location on the result sub-page
  // we just get new data.
  yield take(LOCATION_CHANGE);
  yield race([
    cancel(getUpdateFilters),
    cancel(getGenresList),
  ]);
}

export default [
  getMovieSagas,
];
