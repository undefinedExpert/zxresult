/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import { LOCATION_CHANGE, push } from 'react-router-redux';
import { take, call, select, put, cancel, fork, race } from 'redux-saga/effects';

import { callToApi, processMovieAnalyse, detectPending } from 'mechanisms/movieSearch';

import * as CONSTANT from './constants';
import { selectResult } from './selectors';
import { analyseMovies, updateSingleMovie, updateMovieResult } from './actions';


/**
 * @desc Detects if user will get movies from pending list,
 * or we call to an API for a 20 fresh results.
 */
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


/**
 * @desc Analyse & rank movies
 */
export function* getAnalyseMovie() {
  const analyzed = yield processMovieAnalyse();
  try {
    yield put(analyseMovies.success(analyzed));
  }
  catch (err) {
    yield put(analyseMovies.failure(err));
  }
}


/**
 * @desc Push single result into user, removes it from pending list.
 */
export function* pushSingleResult() {
  const { pending } = yield select(selectResult());

  const singlePendingMovie = pending[0];
  try {
    yield put(updateMovieResult.success(singlePendingMovie));
  }
  catch (err) {
    yield put(updateMovieResult.failure(err));
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


/**
 * @desc Move user into result sub-page when result is set
 */
export function* getUpdateUrl() {
  // TODO: Refactor, turn it on
  yield put(push('/result'));
  // TEMPORARY OFF
}


// \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \

//   _______ _______ _______ _______ _______ _______ _______ _______
//   |\     /|\     /|\     /|\     /|\     /|\     /|\     /|\     /|
//   | +---+ | +---+ | +---+ | +---+ | +---+ | +---+ | +---+ | +---+ |
//   | |   | | |   | | |   | | |   | | |   | | |   | | |   | | |   | |
//   | |W  | | |A  | | |T  | | |C  | | |H  | | |E  | | |R  | | |S  | |
//   | +---+ | +---+ | +---+ | +---+ | +---+ | +---+ | +---+ | +---+ |
//   |/_____\|/_____\|/_____\|/_____\|/_____\|/_____\|/_____\|/_____\|

//    ──▒▒▒▒▒─────▒▒▒▒▒─────▒▒▒▒▒─────▒▒▒▒▒─────▒▒▒▒▒──────▄████▄─────
//    ─▒─▄▒─▄▒───▒─▄▒─▄▒───▒─▄▒─▄▒───▒─▄▒─▄▒───▒─▄▒─▄▒────███▄█▀──────
//    ─▒▒▒▒▒▒▒───▒▒▒▒▒▒▒───▒▒▒▒▒▒▒───▒▒▒▒▒▒▒───▒▒▒▒▒▒▒───▐████──█──█──
//    ─▒▒▒▒▒▒▒───▒▒▒▒▒▒▒───▒▒▒▒▒▒▒───▒▒▒▒▒▒▒───▒▒▒▒▒▒▒────█████▄──────
//    ─▒─▒─▒─▒───▒─▒─▒─▒───▒─▒─▒─▒───▒─▒─▒─▒───▒─▒─▒─▒─────▀████▀─────

// \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \


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
  while (yield take(CONSTANT.ANALYSE_MOVIE.SUCCESS)) {
    yield call(pushSingleResult);
  }
}

export function* getUpdatePendingWatcher() {
  while (yield take(CONSTANT.UPDATE_SINGLE_MOVIE.REQUEST)) {
    yield call(pushSingleResult);
  }
}


export function* getData() {
  // Fork watcher so we can continue execution
  const moviesWatcher = yield fork(getMovieWatcher);
  const updateUrl = yield fork(getResultChangeWatcher);
  const analyseMovieWatcher = yield fork(getAnalyseMovieWatcher);
  const updateSingleMovieWatcher = yield fork(getUpdateSingleMovieWatcher);
  const updatePendingWatcher = yield fork(getUpdatePendingWatcher);

  // Suspend execution until CONSTANT.UPDATE_SINGLE_MOVIE.SUCCESS
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
