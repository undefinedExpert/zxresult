import { expect } from 'chai';
import appReducer from '../reducer';
import { fromJS } from 'immutable';
import {
  updateFilterGenre,
  updateFilterDecade,
  updateFilterTrend,
  updateMovieResult,
  updateFilters,
} from '../actions';

describe('appReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      isLogged: true,
      filters: {
        sentence: 'ohio',
        trend: {
          active: {
            id: 28,
            name: 'Classical',
          },
          list: [
            {
              id: 28,
              name: 'Classical',
            },
            {
              id: 28,
              name: 'Popular',
            },
            {
              id: 28,
              name: 'Classical',
            },
          ],
        },
        decade: {
          active: {
            name: '2000s',
            id: 2000,
          },
          list: [
            {
              name: '2000s',
              id: 2000,
            },
            {
              name: '1990s',
              id: 1990,
            },
            {
              name: '1980s',
              id: 1980,
            },
            {
              name: '1970s',
              id: 1970,
            },
          ],
        },
        genre: {
          active: {
            id: 28,
            name: 'Action',
          },
          list: [],
        },
      },
      result: fromJS({
        movie: null,
        movies: null,
        isFetching: false,
        resultsRange: 0,
      }),
      user: {
        name: 'Emanuel',
        avatar: 'https://avatars0.githubusercontent.com/u/5350669?v=3&s=460',
        watchList: [
          {
            name: 'Titanic',
            decade: '90s',
            rating: 86,
            popularity: 90,
          },
        ],
      },
    });
  });
  it('returns the initial state', () => {
    const excepted = state;
    expect(appReducer(undefined, {})).to.eql(excepted);
  });

  it('should handle the updateFilterGenre action', () => {
    const fixtureActive = 'drama';
    const fixtureList = ['drama', 'action', 'horror'];
    const expectedResult = {
      active: state.setIn(['filters', 'genre', 'active'], fixtureActive),
      list: state.setIn(['filters', 'genre', 'list'], fixtureList),
    };

    expect(appReducer(state, updateFilterGenre.active.request(fixtureActive))).to.eql(expectedResult.active);
    expect(appReducer(state, updateFilterGenre.list.success(fixtureList))).to.eql(expectedResult.list);
  });

  it('should handle the FILTER_DECADE action', () => {
    const fixture = '2000s';
    const expectedResult = state.setIn(['filters', 'decade', 'active'], fixture);
    expect(appReducer(state, updateFilterDecade.active.request(fixture))).to.eql(expectedResult);
  });

  it('should handle the FILTER_TREND action', () => {
    const fixture = 'Classical';
    const expectedResult = state.setIn(['filters', 'trend', 'active'], fixture);
    expect(appReducer(state, updateFilterTrend.active.request(fixture))).to.eql(expectedResult);
  });

  it('should handle the updateMovieResult action', () => {
    const movie = {};
    const movies = [{}, {}];
    const expectedResult = state
      .setIn(['result', 'movie'], movie)
      .setIn(['result', 'movies'], movies)
      .setIn(['result', 'isFetching'], false);

    expect(appReducer(state, updateMovieResult.success(movies, movie))).to.eql(expectedResult);
  });

  it('should handle the updateMovieResult action', () => {
    const movie = {};
    const movies = [{}, {}];
    const expectedResult = {
      request: state
        .setIn(['result', 'isFetching'], true),
      success: state
        .setIn(['result', 'movie'], movie)
        .setIn(['result', 'movies'], movies)
        .setIn(['result', 'isFetching'], false),
    };

    expect(appReducer(state, updateMovieResult.request(movies, movie))).to.eql(expectedResult.request);
    expect(appReducer(state, updateMovieResult.success(movies, movie))).to.eql(expectedResult.success);
  });

  it('should handle the updateFilters action', () => {
    const fixture = 1;
    const expectedResult = state
      .setIn(['result', 'resultsRange'], fixture);

    expect(appReducer(state, updateFilters.success(fixture))).to.eql(expectedResult);
  });
});
