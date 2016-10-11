import { take, call, select, put, cancel, fork, race } from 'redux-saga/effects';
import { ANALYSE_MOVIE, QUEUE_MOVIES, UPDATE_SINGLE_MOVIE, UPDATE_MOVIE_RESULT } from 'containers/App/constants';
import { analyseMovies, queueMovies, updateSingleMovie, updateMovieResult } from 'containers/App/actions';
import { selectResult } from 'containers/App/selectors';
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
  while (yield take(UPDATE_MOVIE_RESULT.REQUEST)) {
    yield call(getMovie);
  }
}

export function* getResultChangeWatcher() {
  while (yield take(UPDATE_MOVIE_RESULT.SUCCESS)) {
    yield call(getUpdateUrl);
  }
}

export function* getAnalyseMovieWatcher() {
  while (yield take(ANALYSE_MOVIE.REQUEST)) {
    yield call(getAnalyseMovie);
  }
}

export function* getUpdateSingleMovieWatcher() {
  while (yield take(QUEUE_MOVIES.SUCCESS)) {
    yield call(getUpdateSingleMovie);
  }
}

export function* getUpdatePendingWatcher() {
  while (yield take(UPDATE_SINGLE_MOVIE.REQUEST)) {
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
  yield take(LOCATION_CHANGE);
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
