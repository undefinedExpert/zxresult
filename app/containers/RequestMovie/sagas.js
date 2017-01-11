/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */
import _ from 'lodash';
import { buffers, delay } from 'redux-saga';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import { take, actionChannel, race, call, select, put, cancel, fork } from 'redux-saga/effects';

import { callApi, movieAnalyse, detectPending, mapGenres } from 'mechanisms/index';

import { selectResult } from './selectors';
import { analyseMovies, updateSingleMovie, updateMovieResult, getDetails } from './actions';
import { UPDATE_MOVIE_RESULT, ANALYSE_MOVIE, UPDATE_SINGLE_MOVIE, DETAILS } from './constants';


/**
 * getMovie
 * @desc Detects if user will get movies from pending list,
 * or we call to an API for a 20 fresh results.
 * TODO: Remove detectPending into separate mechanism "Getting pending"
 */
export function* getMovie() {
  try {
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
  catch (error) {
    console.error(error);
    yield put(updateMovieResult.failure(error));
  }
}


/**
 * getAnalyseMovie
 * @desc Analyse & rank movies
 */
export function* getAnalyseMovie() {
  try {
    const analyzed = yield call(movieAnalyse);
    yield put(analyseMovies.success(analyzed));
  }
  catch (error) {
    console.error(error);
    yield put(analyseMovies.failure(error));
  }
}


/**
 * pushSingleResult
 * @desc Map result genrr_ids with their names, Push single result into user, removes it from pending list
 */
export function* pushSingleResult() {
  const { pending } = yield select(selectResult());
  const singlePendingMovie = pending[0];

  try {
    singlePendingMovie.genres = yield call(mapGenres, singlePendingMovie);
  }
  catch (error) {
    console.error(error);
    yield put(updateMovieResult.failure(error));
  }

  try {
    yield put(updateMovieResult.success(singlePendingMovie));
  }
  catch (error) {
    console.error(error);
    yield put(updateMovieResult.failure(error));
  }

  // Reduce pending movies by item user just take
  const newPending = pending.slice(1);
  try {
    yield put(updateSingleMovie.success(newPending));
  }
  catch (error) {
    console.error(error);
    yield put(updateSingleMovie.failure(error));
  }
}


/**
 * getUpdateUrl
 * @desc Move user into result sub-page when result is set
 */
export function* getUpdateUrl() {
  yield put(push('/result'));
}


/**
 * details
 * @desc Get details of our movie after short amount of time, we got 40req per 10sec limit, be careful with it
 */
export function* details() {
  const { active } = yield select(selectResult());
  const endpoint = `/movie/${active.id}`;

  try {
    const { data } = yield call(callApi, endpoint, { append_to_response: ['images', 'credits'] }, false);
    const merged = _.merge(data, active);
    yield put(getDetails.success(merged));
  }
  catch (err) {
    console.error(err);
    yield put(getDetails.error(err));
  }
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
  // yield buffer for tests
  // https://github.com/redux-saga/redux-saga/issues/727

  const requestChan = yield actionChannel(UPDATE_MOVIE_RESULT.REQUEST, yield buffers.sliding(1));
  while (true) {
    yield take(requestChan);
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

export function* getWatching() {
  yield call(delay, 210); // debounces details call
  yield call(details);
}

export function* getDetailsSeqWatcher() {
  while (true) {
    yield take(UPDATE_SINGLE_MOVIE.SUCCESS);
    yield race({
      call: call(getWatching),
      cancel: take(UPDATE_SINGLE_MOVIE.REQUEST),
    });
  }
}

export function* getResultChangeWatcher() {
  while (yield take(UPDATE_SINGLE_MOVIE.SUCCESS)) { // DETAILS.SUCCESS
    yield call(getUpdateUrl);
  }
}

export function* getInitialRequest() {
  const watchers = yield [
    getMovieWatcher,
    getResultChangeWatcher,
    getAnalyseMovieWatcher,
    getUpdateSingleMovieWatcher,
    getUpdatePendingWatcher,
  ];
  const forked = yield watchers.map(item => fork(item));

  // Suspend execution until UPDATE_SINGLE_MOVIE.SUCCESS
  yield take(LOCATION_CHANGE);
  yield forked.map(item => cancel(item));
}

export function* getInitialDetails() {
  const detailsWatcher = yield fork(getDetailsWatcher);

  yield take(DETAILS.SUCCESS);
  yield cancel(detailsWatcher);
}

export function* getRequestSequence() {
  const watchers = yield [
    getMovieWatcher,
    getAnalyseMovieWatcher,
    getUpdateSingleMovieWatcher,
    getUpdatePendingWatcher,
    getDetailsSeqWatcher,
  ];
  const forked = yield watchers.map(item => fork(item));

  // Suspend execution until UPDATE_SINGLE_MOVIE.SUCCESS
  yield take(LOCATION_CHANGE);
  yield forked.map(item => cancel(item));
}

/**
 * Root saga manages watcher lifecycle
 */

export default {
  initial: [getInitialRequest, getInitialDetails],
  result: [getRequestSequence],
};
