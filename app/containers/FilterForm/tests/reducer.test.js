/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import { expect } from 'chai';
import { fromJS } from 'immutable';

import {
  updateFilterGenre,
  updateFilterDecade,
  updateFilterTrend,
  updateFilters,
  cacheRandomizedPage } from '../actions';
import filterFormReducer from '../reducer';


describe('filterFormReducer', () => {
  let state;
  const currentYear = new Date().getFullYear();
  beforeEach(() => {
    state = fromJS({
      keyword: fromJS({
        active: {
          query: '',
        },
        list: null,
        apiRef: fromJS({
          query: 'query',
        }),
      }),
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
        active: null,
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
    expect(filterFormReducer(undefined, {})).to.eql(state);
  });

  it('should handle the FILTER_DECADE.REQUEST', () => {
    const fixture = '2000s';

    const expectedResult = state.setIn(['decade', 'active'], fixture);
    expect(filterFormReducer(state, updateFilterDecade.active.request(fixture))).to.eql(expectedResult);
  });

  it('should handle the FILTER_TREND.REQUEST', () => {
    const fixture = 'Popular';

    const expectedResult = state.setIn(['trend', 'active'], fixture);
    expect(filterFormReducer(state, updateFilterTrend.active.request(fixture))).to.eql(expectedResult);
  });

  it('should handle the FILTER_GENRE.REQUEST && FILTER_GENRE_LIST.SUCCESS', () => {
    const fixtureActive = 'drama';
    const fixtureList = ['drama', 'action', 'horror'];
    const expectedResult = {
      active: state.setIn(['genre', 'active'], fixtureActive),
      list: state.setIn(['genre', 'list'], fixtureList),
    };

    const active = filterFormReducer(state, updateFilterGenre.active.request(fixtureActive));
    expect(active).to.eql(expectedResult.active);

    const list = filterFormReducer(state, updateFilterGenre.list.success(fixtureList));
    expect(list).to.eql(expectedResult.list);
  });

  it('Should handle the UPDATE_FILTERS.SUCCESS', () => {
    const fixturePages = 5;
    const fixtureResults = 80;

    const expectedResult = state
      .setIn(['range', 'pages'], fixturePages)
      .setIn(['range', 'results'], fixtureResults)
      .setIn(['range', 'pagesCache'], null);

    expect(filterFormReducer(state, updateFilters.success(fixturePages, fixtureResults))).to.eql(expectedResult);
  });

  it('Should handle the CACHE_RANDOMIZED_PAGE.REQUEST', () => {
    const fixturePagesLeft = [1, 3, 4, 5];

    const expectedResult = state
      .setIn(['range', 'pagesCache'], fixturePagesLeft);

    expect(filterFormReducer(state, cacheRandomizedPage.request(fixturePagesLeft))).to.eql(expectedResult);
  });
});
