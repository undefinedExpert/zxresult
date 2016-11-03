/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import { LOCATION_CHANGE, push } from 'react-router-redux';
import { take, call, select, put, cancel, fork } from 'redux-saga/effects';

import { callApi, movieAnalyse, detectPending } from 'mechanisms/index';

import {
  UPDATE_MOVIE_RESULT,
  ANALYSE_MOVIE,
  UPDATE_SINGLE_MOVIE } from './constants';
import { selectResult } from './selectors';
import { analyseMovies, updateSingleMovie, updateMovieResult } from './actions';


/**
 * getMovie
 * @desc Detects if user will get movies from pending list,
 * or we call to an API for a 20 fresh results.
 * TODO: Remove detectPending into separate mechanism "Getting movie"
 * TODO: Refactor error handling
 */
export function* getMovie() {
  const detected = yield call(detectPending);
  const { data } = detected === false ? yield call(callApi, '/discover/movie') : false;

  if (data) {
    console.info('Page downloaded.');
    yield put(analyseMovies.request(data.results));
  }
  else if (detected === true) {
    console.info('Pending Pushed.');
    yield put(updateSingleMovie.request());
  }
  else {
    yield put(updateMovieResult.failure('no movies'));
  }
}


/**
 * getAnalyseMovie
 * @desc Analyse & rank movies
 */
export function* getAnalyseMovie() {
  const analyzed = yield call(movieAnalyse);
  try {
    yield put(analyseMovies.success(analyzed));
  }
  catch (error) {
    yield put(analyseMovies.failure(error));
  }
}


/**
 * pushSingleResult
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
  const newPending = pending.slice(1);
  try {
    yield put(updateSingleMovie.success(newPending));
  }
  catch (err) {
    yield put(updateSingleMovie.failure(err));
  }
}


/**
 * getUpdateUrl
 * @desc Move user into result sub-page when result is set
 */
export function* getUpdateUrl() {
  yield put(push('/result'));
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
  while (yield take(ANALYSE_MOVIE.SUCCESS)) {
    yield call(pushSingleResult);
  }
}

export function* getUpdatePendingWatcher() {
  while (yield take(UPDATE_SINGLE_MOVIE.REQUEST)) {
    yield call(pushSingleResult);
  }
}


export function* getRequestSagas() {
  // Fork watcher so we can continue execution
  const moviesWatcher = yield fork(getMovieWatcher);
  const updateUrl = yield fork(getResultChangeWatcher);
  const analyseMovieWatcher = yield fork(getAnalyseMovieWatcher);
  const updateSingleMovieWatcher = yield fork(getUpdateSingleMovieWatcher);
  const updatePendingWatcher = yield fork(getUpdatePendingWatcher);

  // Suspend execution until UPDATE_SINGLE_MOVIE.SUCCESS
  yield take(LOCATION_CHANGE);
  yield cancel(moviesWatcher);
  yield cancel(updateUrl);
  yield cancel(analyseMovieWatcher);
  yield cancel(updateSingleMovieWatcher);
  yield cancel(updatePendingWatcher);
}

/**
 * Root saga manages watcher lifecycle
 */

// Bootstrap sagas
export default [
  getRequestSagas,
];
