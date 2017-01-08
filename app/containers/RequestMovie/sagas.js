/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import _ from 'lodash';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import { take, actionChannel, call, select, put, cancel, fork } from 'redux-saga/effects';
import { buffers, takeLatest } from 'redux-saga';

import { callApi, movieAnalyse, detectPending, mapGenres } from 'mechanisms/index';

import {
  UPDATE_MOVIE_RESULT,
  ANALYSE_MOVIE,
  UPDATE_SINGLE_MOVIE,
  DETAILS } from './constants';
import { selectResult } from './selectors';
import { analyseMovies, updateSingleMovie, updateMovieResult, getDetails } from './actions';


/**
 * getMovie
 * @desc Detects if user will get movies from pending list,
 * or we call to an API for a 20 fresh results.
 * TODO: Remove detectPending into separate mechanism "Getting pending"
 * TODO: Refactor error handling
 */
export function* getMovie() {
  const detected = yield call(detectPending);
  const { data } = detected === false ? yield call(callApi, '/discover/movie') : false;


  if (detected === true) {
    console.info('Pending Pushed.');
    yield put(updateSingleMovie.request());
  }
  else if (data) {
    console.info('Page downloaded.');
    yield put(analyseMovies.request(data.results));
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
    singlePendingMovie.genres = yield call(mapGenres, singlePendingMovie);
  }
  catch (err) {
    console.log(err);
  }

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
  console.log('should push/')
  yield put(push('/result'));
}


/**
 * details
 * @desc Get details of our movie after short amount of time, we got 40req per 10sec limit, be careful with it
 */
export function* details() {
  const { active } = yield select(selectResult());
  const endpoint = `/movie/${active.id}`;

  const { data } = yield call(callApi, endpoint, { append_to_response: ['images', 'credits'] }, false);

  const merged = _.merge(data, active);
  yield put(getDetails.success(merged));
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
  const requestChan = yield actionChannel(UPDATE_MOVIE_RESULT.REQUEST, buffers.sliding(1));
  while (yield take(requestChan)) {
    yield call(getMovie);
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

export function* getDetailsWatcher() {
  while (yield take(UPDATE_SINGLE_MOVIE.SUCCESS)) {
    yield call(details);
  }
}

export function* getResultChangeWatcher() {
  while (yield take(DETAILS.SUCCESS)) { // DETAILS.SUCCESS
    yield call(getUpdateUrl);
  }
}


export function* getInitialRequest() {
  // potrzebuje uruchomic 'sekwencje', i nie lapac kolejnych
  // getMovieWatcherow
  // trzeba zrobic kolejkowanie przy wykorzystaniu kanalow redux saga
  // Fork watcher so we can continue execution

  //

  const moviesWatcher = yield fork(getMovieWatcher);
  const updateUrl = yield fork(getResultChangeWatcher);
  const analyseMovieWatcher = yield fork(getAnalyseMovieWatcher);
  const updateSingleMovieWatcher = yield fork(getUpdateSingleMovieWatcher);
  const updatePendingWatcher = yield fork(getUpdatePendingWatcher);
  const detailsWatcher = yield fork(getDetailsWatcher);

  // Suspend execution until UPDATE_SINGLE_MOVIE.SUCCESS
  yield take(LOCATION_CHANGE);
  yield cancel(moviesWatcher);
  yield cancel(updateUrl);
  yield cancel(analyseMovieWatcher);
  yield cancel(updateSingleMovieWatcher);
  yield cancel(updatePendingWatcher);
  yield cancel(detailsWatcher);
}

export function* getRequestSequence() {
  const moviesWatcher = yield fork(getMovieWatcher);
  const analyseMovieWatcher = yield fork(getAnalyseMovieWatcher);
  const updateSingleMovieWatcher = yield fork(getUpdateSingleMovieWatcher);
  const updatePendingWatcher = yield fork(getUpdatePendingWatcher);

  // Suspend execution until UPDATE_SINGLE_MOVIE.SUCCESS
  yield take(LOCATION_CHANGE);
  yield cancel(moviesWatcher);
  yield cancel(analyseMovieWatcher);
  yield cancel(updateSingleMovieWatcher);
  yield cancel(updatePendingWatcher);
}

// TODO: Anulowanie sciagania naszych detaili po kazdym nowym UPDATE_MOVIE_RESULT.REQUEST i ponowne uruchomienie
export function* getRequestSequenceDetails() {
  // const detailsWatcher = yield fork(getDetailsWatcher);
  //
  // yield take(LOCATION_CHANGE);
  // yield cancel(detailsWatcher);
}
/**
 * Root saga manages watcher lifecycle
 */

// Bootstrap sagas
export default {
  initial: [getInitialRequest],
  result: [getRequestSequence, getRequestSequenceDetails]
};
