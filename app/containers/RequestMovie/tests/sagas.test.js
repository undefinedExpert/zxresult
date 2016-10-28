/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import { expect } from 'chai';
// import { LOCATION_CHANGE } from 'react-router-redux';
import { call, put, select } from 'redux-saga/effects';

import { callApi, movieAnalyse, detectPending } from 'mechanisms/index';

import { analyseMovies, updateSingleMovie, updateMovieResult } from '../actions';

import { selectResult } from '../selectors';
import { getMovie, getAnalyseMovie, pushSingleResult } from '../sagas';


describe('FilterForm saga handlers', () => {
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
    it('Should handle success action', () => {
      generator = pushSingleResult();

      const task = generator.next().value;
      const operation = select(selectResult());
      expect(task).expectEqual(operation);
    });

    it('Should handle error action', () => {
      // FIXME: create test for handling error
    });
  });
});
