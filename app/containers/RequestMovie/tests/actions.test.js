/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import { expect } from 'chai';

import * as CONSTANT from '../constants';
import {
  updateMovieResult,
  analyseMovies,
  updateSingleMovie } from '../actions';


describe('FilterForm Actions', () => {
  describe('updateMovieResult()', () => {
    let active;
    let error;
    beforeEach(() => {
      active = 'value';
      error = 'error';
    });

    it('Should call actions from updateMovieResult - requested, succeed, failed', () => {
      const expected = {
        request: {
          type: CONSTANT.UPDATE_MOVIE_RESULT.REQUEST,
        },
        success: {
          type: CONSTANT.UPDATE_MOVIE_RESULT.SUCCESS,
          active,
        },
        failure: {
          type: CONSTANT.UPDATE_MOVIE_RESULT.FAILURE,
          error,
        },
      };

      expect(updateMovieResult.request()).to.eql(expected.request);
      expect(updateMovieResult.success(active)).to.eql(expected.success);
      expect(updateMovieResult.failure(error)).to.eql(expected.failure);
    });
  });

  describe('analyseMovies()', () => {
    let pending;
    let notSorted;
    let error;
    beforeEach(() => {
      pending = [];
      notSorted = [];
      error = 'error';
    });

    it('Should call actions from analyseMovies - requested, succeed, failed', () => {
      const expected = {
        request: {
          type: CONSTANT.ANALYSE_MOVIE.REQUEST,
          notSorted,
        },
        success: {
          type: CONSTANT.ANALYSE_MOVIE.SUCCESS,
          pending,
        },
        failure: {
          type: CONSTANT.ANALYSE_MOVIE.FAILURE,
          error,
        },
      };

      expect(analyseMovies.request(notSorted)).to.eql(expected.request);
      expect(analyseMovies.success(pending)).to.eql(expected.success);
      expect(analyseMovies.failure(error)).to.eql(expected.failure);
    });
  });

  describe('updateSingleMovie()', () => {
    let active;
    let removePending;
    let error;
    beforeEach(() => {
      active = {};
      removePending = [];
      error = 'error';
    });

    it('Should call actions from updateSingleMovie - requested, succeed, failed', () => {
      const expected = {
        request: {
          type: CONSTANT.UPDATE_SINGLE_MOVIE.REQUEST,
          active,
        },
        success: {
          type: CONSTANT.UPDATE_SINGLE_MOVIE.SUCCESS,
          removePending,
        },
        failure: {
          type: CONSTANT.UPDATE_SINGLE_MOVIE.FAILURE,
          error,
        },
      };

      expect(updateSingleMovie.request(active)).to.eql(expected.request);
      expect(updateSingleMovie.success(removePending)).to.eql(expected.success);
      expect(updateSingleMovie.failure(error)).to.eql(expected.failure);
    });
  });
});
