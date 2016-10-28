/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import { expect } from 'chai';
import { fromJS } from 'immutable';

import { updateFilters } from 'containers/FilterForm/actions';

import {
  analyseMovies,
  updateMovieResult,
  updateSingleMovie } from '../actions';
import requestMovieReducer from '../reducer';


describe('requestMovieReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      active: fromJS(null),
      notSorted: fromJS([]), // Freshly downloaded, before moved to pending need to be analysed.
      pending: fromJS([]),
      cache: fromJS([]),
      noMoreResults: false,
      isFetching: false,
    });
  });

  it('returns the initial state', () => {
    expect(requestMovieReducer(undefined, {})).to.eql(state);
  });

  it('should handle the UPDATE_MOVIE_RESULT.REQUEST', () => {
    const fixture = true;
    const expected = state.setIn(['isFetching'], fixture);
    expect(requestMovieReducer(state, updateMovieResult.request(fixture))).to.eql(expected);
  });

  it('should handle the UPDATE_MOVIE_RESULT.SUCCESS', () => {
    const fixtureActive = fromJS({});
    const fixtureIsFetching = false;

    const expected = state
      .setIn(['active'], fixtureActive)
      .setIn(['isFetching'], fixtureIsFetching);
    expect(requestMovieReducer(state, updateMovieResult.success(fixtureActive))).to.eql(expected);
  });

  it('should handle the UPDATE_MOVIE_RESULT.FAILURE', () => {
    const fixtureNoMoreResults = true;
    const fixtureIsFetching = false;

    const expected = state
      .setIn(['noMoreResults'], fixtureNoMoreResults)
      .setIn(['isFetching'], fixtureIsFetching);
    expect(requestMovieReducer(state, updateMovieResult.failure())).to.eql(expected);
  });

  it('should handle the ANALYSE_MOVIE.REQUEST', () => {
    const fixture = fromJS([]);

    const expected = state.setIn(['notSorted'], fixture);
    expect(requestMovieReducer(state, analyseMovies.request(fixture))).to.eql(expected);
  });

  it('should handle the ANALYSE_MOVIE.SUCCESS', () => {
    const fixturePending = fromJS([]);
    const fixtureIsFetching = false;

    const expected = state
      .setIn(['pending'], fixturePending)
      .setIn(['isFetching'], fixtureIsFetching);
    expect(requestMovieReducer(state, analyseMovies.success(fixturePending))).to.eql(expected);
  });

  it('should handle the ANALYSE_MOVIE.FAILURE', () => {
    const fixture = false;

    const expected = state.setIn(['isFetching'], fixture);
    expect(requestMovieReducer(state, analyseMovies.failure(fixture))).to.eql(expected);
  });

  it('should handle the UPDATE_SINGLE_MOVIE.SUCCESS', () => {
    const fixture = fromJS([]);

    const expected = state.setIn(['pending'], fixture);
    expect(requestMovieReducer(state, updateSingleMovie.success(fixture))).to.eql(expected);
  });

  it('should handle the UPDATE_FILTERS.SUCCESS', () => {
    const fixtureNoMoreResults = false;
    const fixturePending = fromJS([]);

    const expected = state
      .setIn(['noMoreResults'], fixtureNoMoreResults)
      .setIn(['pending'], fixturePending);
    expect(requestMovieReducer(state, updateFilters.success())).to.eql(expected);
  });
});
