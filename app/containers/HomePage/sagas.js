import { take, call, select, put, cancel, fork, race } from 'redux-saga/effects';
import * as CONSTANT from 'containers/App/constants';
import { updateMovieResult, updateFilterGenre, updateFilters, analyseMovies, queueMovies, updateSingleMovie } from 'containers/App/actions';
import { selectResult } from 'containers/App/selectors';
import { callToApi, processMovieAnalyse, detectPending } from 'mechanisms/movieSearch';
import { LOCATION_CHANGE, push } from 'react-router-redux';

// Get movie
export function* getMovie() {
  //
  // console.clear();
  const detected = yield detectPending();
  const { data } = !detected ? yield callToApi('/discover/movie') : false;

  if (detected) {
    yield console.info('Pending updated.');
    yield put(updateSingleMovie.request());
  }
  else if (data) {
    yield console.info('Result updated.');
    yield put(analyseMovies.request(data));
  }
  else {
    yield put(updateMovieResult.failure('no movies'));
  }
}

// Individual exports for testing
export function* getGenreList() {
  const { data } = yield callToApi('/genre/movie/list', {}, false);
  try {
    yield put(updateFilterGenre.list.success(data.genres));
  }
  catch (err) {
    yield put(updateFilterGenre.list.failure(err));
  }
}

// Update filters have make a request to server
export function* getUpdateFilters() {
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

export function* getAnalyseMovie() {
  const analyzed = yield processMovieAnalyse();
  try {
    yield put(queueMovies.success(analyzed));
  }
  catch (err) {
    yield put(queueMovies.failure(err));
  }
}

export function* getUpdateSingleMovie() {
  const { pending } = yield select(selectResult());
  // Take 1st element from our pending movies
  console.log('update single')
  // debugger;
  const singlePendingMovie = pending[0];
  try {
    yield put(updateMovieResult.success(singlePendingMovie));
  }
  catch (err) {
    yield put(queueMovies.failure(err));
  }

  // Reduce pending movies by item user just take
  yield pending.shift();
  try {
    yield put(updateSingleMovie.success(pending));
  }
  catch (err) {
    yield put(updateSingleMovie.failure(err));
  }
}

export function* getUpdateUrl() {
  // TODO: Refactor, turn it on
  yield put(push('/result'));
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

export function* getAnalyseMovieWatcher() {
  while (yield take(CONSTANT.ANALYSE_MOVIE.REQUEST)) {
    yield call(getAnalyseMovie);
  }
}

export function* getUpdateSingleMovieWatcher() {
  while (yield take(CONSTANT.QUEUE_MOVIES.SUCCESS) || take(CONSTANT.UPDATE_SINGLE_MOVIE.REQUEST)) {
    yield call(getUpdateSingleMovie);
  }
}

export function* getUpdatePendingWatcher() {
  while (yield take(CONSTANT.UPDATE_SINGLE_MOVIE.REQUEST)) {
    yield call(getUpdateSingleMovie);
  }
}

export function* getData() {
  // Fork watcher so we can continue execution
  const moviesWatcher = yield fork(getMovieWatcher);
  const updateUrl = yield fork(getResultChangeWatcher);
  const genreListWatcher = yield fork(getGenresListWatcher);
  const updateFilterWatcher = yield fork(getUpdateFiltersWatcher);
  const analyseMovieWatcher = yield fork(getAnalyseMovieWatcher);
  const updateSingleMovieWatcher = yield fork(getUpdateSingleMovieWatcher);
  const updatePendingWatcher = yield fork(getUpdatePendingWatcher);

  // Suspend execution until location changes
  // TODO: Change this to custom action, when the user request new 'result' or something like this.
  // The main reason of that is to not rely on LOCATION_CHANGE event because we 'actually' dose not change the location on the result sub-page
  // we just get new data.
  yield take(LOCATION_CHANGE);
  yield race([
    cancel(moviesWatcher),
    cancel(updateUrl),
    cancel(genreListWatcher),
    cancel(updateFilterWatcher),
    cancel(analyseMovieWatcher),
    cancel(updateSingleMovieWatcher),
    cancel(updatePendingWatcher),
  ]);
}

/**
 * Root saga manages watcher lifecycle
 */

// Bootstrap sagas
export default [
  getData,
];
