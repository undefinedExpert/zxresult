/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import { expect } from 'chai';
import { LOCATION_CHANGE } from 'react-router-redux';
import { call, put, take, fork } from 'redux-saga/effects';

import { detectPending, callApi } from 'mechanisms/index';

import { analyseMovies, updateSingleMovie, updateMovieResult } from '../actions';

import { getMovie } from '../sagas';


describe('FilterForm saga handlers', () => {
  describe('getMovie Saga', () => {
    let globalGenerator;
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
});
