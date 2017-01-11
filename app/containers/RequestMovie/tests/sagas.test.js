/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import { expect } from 'chai';
import { createMockTask } from 'redux-saga/utils';
import { LOCATION_CHANGE } from 'react-router-redux';
import { call, put, select, take, fork, cancel, actionChannel } from 'redux-saga/effects';

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
  getInitialDetails,
  getDetailsSeqWatcher,
  getRequestSequence,
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
      const buffer = generator.next().value;

      const taskChannel = generator.next(buffer).value;
      const operationChannel = actionChannel(constant, buffer);
      expect(taskChannel).to.be.eql(operationChannel);

      const taskLoop = generator.next(constant, buffer).value;
      const operationLoop = take(constant);
      expect(taskLoop).to.be.eql(operationLoop);

      const taskCall = generator.next(constant).value;
      const operationCall = call(getMovie);
      expect(taskCall).to.be.eql(operationCall);
    });
  });
  describe('getResultChangeWatcher Watcher', () => {
    const generator = getResultChangeWatcher();
    const constant = UPDATE_SINGLE_MOVIE.SUCCESS;

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

describe('getInitialRequest Saga', () => {
  const movieSagas = getInitialRequest();
  const watchersArr = [
    getMovieWatcher,
    getResultChangeWatcher,
    getAnalyseMovieWatcher,
    getUpdateSingleMovieWatcher,
    getUpdatePendingWatcher,
  ];
  const mockTask = createMockTask();
  const mockTasksFork = [() => mockTask, () => mockTask];
  const mockTasksCancel = [mockTask, mockTask];

  it('should fork each element of watchers array', () => {
    const task = movieSagas.next();
    const operation = watchersArr;

    expect(task.value).to.be.eql(operation);
  });

  it('should asynchronously fork each watchers', () => {
    const task = movieSagas.next(mockTasksFork);
    const operation = mockTasksFork.map(item => fork(item));

    expect(task.value).to.be.eql(operation);
  });

  it('should yield until LOCATION_CHANGE action', () => {
    const task = movieSagas.next(mockTasksCancel);
    const operation = take(LOCATION_CHANGE);

    expect(task.value).to.be.eql(operation);
  });

  it('should asynchronously cancel each watchers', () => {
    const task = movieSagas.next();
    const operation = mockTasksCancel.map(item => cancel(item));
    expect(task.value).to.be.eql(operation);
  });
});

describe('getRequestSequence Saga', () => {
  const generator = getInitialDetails();
  const mockTask = createMockTask();

  it('should fork the getDetailsWatcher', () => {
    const task = generator.next();
    const operation = fork(getDetailsWatcher);
    expect(task.value).to.be.eql(operation);
  });

  it('should wait until DETAILS.SUCESS action show ', () => {
    const task = generator.next(mockTask);
    const operation = take(DETAILS.SUCCESS);
    expect(task.value).to.be.eql(operation);
  });

  it('should cancel our forked getDetailsWatcher', () => {
    const task = generator.next();
    const operation = cancel(mockTask);
    expect(task.value).to.be.eql(operation);
  });
});


describe('getRequestSequence Saga', () => {
  const movieSagas = getRequestSequence();
  const watchersArr = [
    getMovieWatcher,
    getAnalyseMovieWatcher,
    getUpdateSingleMovieWatcher,
    getUpdatePendingWatcher,
    getDetailsSeqWatcher,
  ];
  const mockTask = createMockTask();
  const mockTasksFork = [() => mockTask, () => mockTask];
  const mockTasksCancel = [mockTask, mockTask];

  it('should fork each element of watchers array', () => {
    const task = movieSagas.next();
    const operation = watchersArr;

    expect(task.value).to.be.eql(operation);
  });

  it('should asynchronously fork each watchers', () => {
    const task = movieSagas.next(mockTasksFork);
    const operation = mockTasksFork.map(item => fork(item));

    expect(task.value).to.be.eql(operation);
  });

  it('should yield until LOCATION_CHANGE action', () => {
    const task = movieSagas.next(mockTasksCancel);
    const operation = take(LOCATION_CHANGE);

    expect(task.value).to.be.eql(operation);
  });

  it('should asynchronously cancel each watchers', () => {
    const task = movieSagas.next();
    const operation = mockTasksCancel.map(item => cancel(item));
    expect(task.value).to.be.eql(operation);
  });
});

