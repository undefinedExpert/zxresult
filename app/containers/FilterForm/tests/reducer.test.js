/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import { expect } from 'chai';
import { fromJS } from 'immutable';

import filterFormReducer from '../reducer';
import {
  updateFilterGenre,
  updateFilterDecade,
  updateFilterTrend,
  updateFilters,
  cacheRandomizedPage } from '../actions';


describe('filterFormReducer', () => {
  let state;
  const currentYear = new Date().getFullYear();
  beforeEach(() => {
    state = fromJS({
      sentence: 'ohio',
      trend: fromJS({
        active: fromJS({
          name: 'Popular',
          voteAverageMin: null,
          voteAverageMax: null,
          voteCountMin: 300,
          voteCountMax: null,
        }),
        list: fromJS([
          fromJS({
            name: 'Highly rated',
            voteAverageMin: 6.5,
            voteAverageMax: 10,
            voteCountMin: 70,
            voteCountMax: null,
          }),
          fromJS({
            name: 'Popular',
            voteAverageMin: null,
            voteAverageMax: null,
            voteCountMin: 300,
            voteCountMax: null,
          }),
          fromJS({
            name: 'Most Popular',
            voteAverageMin: null,
            voteAverageMax: null,
            voteCountMin: 700,
            voteCountMax: null,
          }),
          fromJS({
            name: 'Underestimated',
            voteAverageMin: 7,
            voteAverageMax: 10,
            voteCountMin: 50,
            voteCountMax: 200,
          }),
        ]),
        apiRef: fromJS({
          voteAverageMin: 'vote_average.gte',
          voteAverageMax: 'vote_average.lte',
          voteCountMax: 'vote_count.lte',
          voteCountMin: 'vote_count.gte',
        }),
      }),
      decade: fromJS({
        active: fromJS({
          name: '1970s',
          dateMin: '1970-01-01',
          dateMax: '1979-01-01',
        }),
        list: fromJS([
          fromJS({
            name: '2010s',
            dateMin: '2010-01-01',
            dateMax: `${currentYear}-01-01`,
          }),
          fromJS({
            name: '2000s',
            dateMin: '2000-01-01',
            dateMax: '2009-01-01',
          }),
          fromJS({
            name: '1990s',
            dateMin: '1990-01-01',
            dateMax: '1999-01-01',
          }),
          fromJS({
            name: '1980s',
            dateMin: '1980-01-01',
            dateMax: '1989-01-01',
          }),
          fromJS({
            name: '1970s',
            dateMin: '1970-01-01',
            dateMax: '1979-01-01',
          }),
          fromJS({
            name: '1960s',
            dateMin: '1960-01-01',
            dateMax: '1969-01-01',
          }),
          fromJS({
            name: 'Older',
            dateMin: '1900-01-01',
            dateMax: '1959-01-01',
          }),
        ]),
        apiRef: fromJS({
          dateMin: 'primary_release_date.gte',
          dateMax: 'primary_release_date.lte',
        }),
      }),
      genre: fromJS({
        active: fromJS({
          id: 16,
          name: 'Animation',
        }),
        list: fromJS([]),
        apiRef: fromJS({
          id: 'with_genres',
        }),
      }),
      range: fromJS({
        pages: 0,
        pagesCache: null,
        results: 0,
      }),
    });
  });

  it('returns the initial state', () => {
    expect(filterFormReducer(undefined, { type: null })).to.eql(state);
  });

  it('should handle the updateFilterGenre action', () => {
    const fixtureActive = 'drama';
    const fixtureList = ['drama', 'action', 'horror'];
    const expectedResult = {
      active: state.setIn(['genre', 'active'], fixtureActive),
      list: state.setIn(['genre', 'list'], fixtureList),
    };

    const active = filterFormReducer(state, updateFilterGenre.active.request(fixtureActive));

    console.log('\n', updateFilterGenre.active.request(fixtureActive), '\n');
    console.log('\n', expectedResult.active.toJS().genre.active, '\n');

    expect(active).to.eql(expectedResult.active);
    // expect(filterFormReducer(state, updateFilterGenre.list.success(fixtureList))).to.eql(expectedResult.list);
  });
  //
  // it('should handle the UPDATE_FILTER_DECADE action', () => {
  //   const fixture = '2000s';
  //   const expectedResult = state.setIn(['filters', 'decade', 'active'], fixture);
  //   expect(appReducer(state, updateFilterDecade.active.request(fixture))).to.eql(expectedResult);
  // });
  //
  // it('should handle the UPDATE_FILTER_TREND action', () => {
  //   const fixture = 'Classical';
  //   const expectedResult = state.setIn(['filters', 'trend', 'active'], fixture);
  //   expect(appReducer(state, updateFilterTrend.active.request(fixture))).to.eql(expectedResult);
  // });
  //
  // it('should handle the updateMovieResult action', () => {
  //   const movie = {};
  //   const movies = [{}, {}];
  //   const expectedResult = state
  //     .setIn(['result', 'movie'], movie)
  //     .setIn(['result', 'movies'], movies)
  //     .setIn(['result', 'isFetching'], false);
  //
  //   expect(appReducer(state, updateMovieResult.success(movies, movie))).to.eql(expectedResult);
  // });
  //
  // it('should handle the updateMovieResult action', () => {
  //   const movie = {};
  //   const movies = [{}, {}];
  //   const expectedResult = {
  //     request: state
  //       .setIn(['result', 'isFetching'], true),
  //     success: state
  //       .setIn(['result', 'movie'], movie)
  //       .setIn(['result', 'movies'], movies)
  //       .setIn(['result', 'isFetching'], false),
  //   };
  //
  //   expect(appReducer(state, updateMovieResult.request(movies, movie))).to.eql(expectedResult.request);
  //   expect(appReducer(state, updateMovieResult.success(movies, movie))).to.eql(expectedResult.success);
  // });
  //
  // it('should handle the updateFilters action', () => {
  //   const fixture = 1;
  //   const expectedResult = state
  //     .setIn(['result', 'resultsRange'], fixture);
  //
  //   expect(appReducer(state, updateFilters.success(fixture))).to.eql(expectedResult);
  // });
});
