import { take, call, select, put, cancel, fork, race } from 'redux-saga/effects';
import * as CONSTANT from './constants';
import { analyseMovies, queueMovies, updateSingleMovie, updateMovieResult } from './actions';
import { selectResult } from './selectors';
import { callToApi, processMovieAnalyse, detectPending } from 'mechanisms/movieSearch';
import { LOCATION_CHANGE, push } from 'react-router-redux';

// Get movie
export function* getMovie() {
  const detected = yield detectPending();
  const { data } = !detected ? yield callToApi('/discover/movie') : false;

  if (data) {
    yield console.info('Page downloaded.');
    yield put(analyseMovies.request(data));
  }
  else if (detected) {
    yield console.info('Pending Pushed.');
    yield put(updateSingleMovie.request());
  }
  else {
    yield put(updateMovieResult.failure('no movies'));
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

  const singlePendingMovie = pending[0];
  try {
    yield put(updateMovieResult.success(singlePendingMovie));
  }
  catch (err) {
    yield put(queueMovies.failure(err));
  }


  // Reduce pending movies by item user just take
  const newPending = yield pending.slice(1);
  try {
    yield put(updateSingleMovie.success(newPending));
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

export function* getResultChangeWatcher() {
  while (yield take(CONSTANT.UPDATE_MOVIE_RESULT.SUCCESS)) {
    yield call(getUpdateUrl);
  }
}

export function* getAnalyseMovieWatcher() {
  while (yield take(CONSTANT.ANALYSE_MOVIE.REQUEST)) {
    yield call(getAnalyseMovie);
  }
}

export function* getUpdateSingleMovieWatcher() {
  while (yield take(CONSTANT.QUEUE_MOVIES.SUCCESS)) {
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
  const analyseMovieWatcher = yield fork(getAnalyseMovieWatcher);
  const updateSingleMovieWatcher = yield fork(getUpdateSingleMovieWatcher);
  const updatePendingWatcher = yield fork(getUpdatePendingWatcher);

  // Suspend execution until location changes
  // TODO: Change this to custom action, when the user request new 'result' or something like this.
  // The main reason of that is to not rely on LOCATION_CHANGE event because we 'actually' dose not change the location on the result sub-page
  // we just get new data.
  yield take(CONSTANT.UPDATE_SINGLE_MOVIE.SUCCESS);
  yield race([
    cancel(moviesWatcher),
    cancel(updateUrl),
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
