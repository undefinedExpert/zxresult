/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import { expect } from 'chai';
import { LOCATION_CHANGE } from 'react-router-redux';
import { call, put, select, take, fork } from 'redux-saga/effects';

import { callApi, movieAnalyse, detectPending, mapGenres } from 'mechanisms/index';

import { analyseMovies, updateSingleMovie, updateMovieResult } from '../actions';

import {
  UPDATE_MOVIE_RESULT,
  ANALYSE_MOVIE,
  UPDATE_SINGLE_MOVIE,
  DETAILS } from '../constants';
import {
  getMovie,
  getAnalyseMovie,
  pushSingleResult,
  getUpdateUrl,
  getMovieWatcher,
  getResultChangeWatcher,
  getAnalyseMovieWatcher,
  getUpdateSingleMovieWatcher,
  getUpdatePendingWatcher,
  getDetailsWatcher,
  getInitialRequest,
} from '../sagas';
import { selectResult } from '../selectors';


describe('RequestMovie saga handlers', () => {
  describe('getMovie Saga', () => {
    let globalGenerator;

    // detectPending might return false, true, null
    beforeEach(() => {
      globalGenerator = getMovie();
      const taskPending = globalGenerator.next().value;
      const operationPending = call(detectPending);
      expect(taskPending).to.be.eql(operationPending);
    });

    it('Should handle page download case', () => {
      const generator = globalGenerator;

      const taskCall = generator.next(false).value;
      const operationCall = call(callApi, '/discover/movie');
      expect(taskCall).to.be.eql(operationCall);

      const data = { results: [] };
      const taskAnalyse = generator.next({ data }).value;
      const operationAnalyse = put(analyseMovies.request(data.results));
      expect(taskAnalyse).to.be.eql(operationAnalyse);
    });

    it('Should handle pushing pending result', () => {
      const generator = globalGenerator;

      const taskPushPending = generator.next(true).value;
      const operationPushPending = put(updateSingleMovie.request());
      expect(taskPushPending).to.be.eql(operationPushPending);
    });

    it('Should handle no more movies case', () => {
      const generator = globalGenerator;

      const taskPushPending = generator.next(null).value;
      const operationPushPending = put(updateMovieResult.failure('no movies'));
      expect(taskPushPending).to.be.eql(operationPushPending);
    });
  });
  describe('getAnalyseMovie Saga', () => {
    let generator;
    beforeEach(() => {
      generator = getAnalyseMovie();

      const taskAnalyse = generator.next().value;
      const operationAnalyse = call(movieAnalyse);
      expect(taskAnalyse).to.eql(operationAnalyse);
    });

    it('Should handle success action', () => {
      const analyzed = [];
      const task = generator.next(analyzed).value;
      const operation = put(analyseMovies.success(analyzed));
      expect(task).to.be.eql(operation);
    });

    it('Should handle error action', () => {
      // FIXME: create test for handling error
    });
  });
  describe('pushSingleResult Saga', () => {
    let generator;


    it('Should select pending list, take first element, push it to the result and remove it from pending list, finally update the store with new pending list', () => {
      generator = pushSingleResult();

      const taskSelect = generator.next().value;
      const operationSelect = select(selectResult());
      expect(taskSelect).expectEqual(operationSelect);

      const pending = [{}, {}];
      const singlePending = pending[0];
      const taskMapGenres = generator.next({ pending }).value;
      const operationMapGenres = call(mapGenres, {});
      expect(taskMapGenres).to.be.eql(operationMapGenres);

      const taskPut = generator.next({ pending }).value;
      const operationPut = put(updateMovieResult.success(singlePending));
      expect(taskPut).to.be.eql(operationPut);

      const newPending = pending.slice(1);
      const taskUpdatePending = generator.next(newPending).value;
      const operationUpdatePending = put(updateSingleMovie.success(newPending));
      expect(taskUpdatePending).to.be.eql(operationUpdatePending);
    });

    it('Should handle error action', () => {
      // FIXME: create test for handling error
    });
  });
});

describe('RequestMovie saga watchers', () => {
  describe('getMovieWatcher Watcher', () => {
    const generator = getMovieWatcher();
    const constant = UPDATE_MOVIE_RESULT.REQUEST;

    it(`should watch for ${constant} action`, () => {
      const taskLoop = generator.next().value;
      const operationLoop = take(constant);
      expect(taskLoop).to.be.eql(operationLoop);

      const taskCall = generator.next(constant).value;
      const operationCall = call(getMovie);
      expect(taskCall).to.be.eql(operationCall);
    });
  });
  describe('getResultChangeWatcher Watcher', () => {
    const generator = getResultChangeWatcher();
    const constant = DETAILS.SUCCESS;

    it(`should watch for ${constant} action`, () => {
      const taskLoop = generator.next().value;
      const operationLoop = take(constant);
      expect(taskLoop).to.be.eql(operationLoop);

      const taskCall = generator.next(constant).value;
      const operationCall = call(getUpdateUrl);
      expect(taskCall).to.be.eql(operationCall);
    });
  });
  describe('getAnalyseMovieWatcher Watcher', () => {
    const generator = getAnalyseMovieWatcher();
    const constant = ANALYSE_MOVIE.REQUEST;

    it(`should watch for ${constant} action`, () => {
      const taskLoop = generator.next().value;
      const operationLoop = take(constant);
      expect(taskLoop).to.be.eql(operationLoop);

      const taskCall = generator.next(constant).value;
      const operationCall = call(getAnalyseMovie);
      expect(taskCall).to.be.eql(operationCall);
    });
  });
  describe('getUpdateSingleMovieWatcher Watcher', () => {
    const generator = getUpdateSingleMovieWatcher();
    const constant = ANALYSE_MOVIE.SUCCESS;

    it(`should watch for ${constant} action`, () => {
      const taskLoop = generator.next().value;
      const operationLoop = take(constant);
      expect(taskLoop).to.be.eql(operationLoop);

      const taskCall = generator.next(constant).value;
      const operationCall = call(pushSingleResult);
      expect(taskCall).to.be.eql(operationCall);
    });
  });
  describe('getUpdatePendingWatcher Watcher', () => {
    const generator = getUpdatePendingWatcher();
    const constant = UPDATE_SINGLE_MOVIE.REQUEST;

    it(`should watch for ${constant} action`, () => {
      const taskLoop = generator.next().value;
      const operationLoop = take(constant);
      expect(taskLoop).to.be.eql(operationLoop);

      const taskCall = generator.next(constant).value;
      const operationCall = call(pushSingleResult);
      expect(taskCall).to.be.eql(operationCall);
    });
  });
});

describe('getMovieSagas Saga', () => {
  const movieSagas = getInitialRequest();

  it('should asynchronously fork moviesWatcher saga', () => {
    const task = movieSagas.next();
    const operation = fork(getMovieWatcher);

    expect(task.value).to.be.eql(operation);
  });

  it('should asynchronously fork updateUrl saga', () => {
    const task = movieSagas.next();
    const operation = fork(getResultChangeWatcher);

    expect(task.value).to.be.eql(operation);
  });

  it('should asynchronously fork analyseMovieWatcher saga', () => {
    const task = movieSagas.next();
    const operation = fork(getAnalyseMovieWatcher);

    expect(task.value).to.be.eql(operation);
  });

  it('should asynchronously fork getUpdateSingleMovieWatcher saga', () => {
    const task = movieSagas.next();
    const operation = fork(getUpdateSingleMovieWatcher);

    expect(task.value).to.be.eql(operation);
  });

  it('should asynchronously fork getUpdatePendingWatcher saga', () => {
    const task = movieSagas.next();
    const operation = fork(getUpdatePendingWatcher);

    expect(task.value).to.be.eql(operation);
  });

  it('should asynchronously fork getDetailsWatcher saga', () => {
    const task = movieSagas.next();
    const operation = fork(getDetailsWatcher);

    expect(task.value).to.be.eql(operation);
  });

  it('should yield until LOCATION_CHANGE action', () => {
    const task = movieSagas.next();
    const operation = take(LOCATION_CHANGE);

    expect(task.value).to.be.eql(operation);
  });

  it('Should race and cancel forks', () => {
    // TODO: Make a working test
    console.warn('TODO');
  });
});

