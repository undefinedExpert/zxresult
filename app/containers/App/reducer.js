/*
 *
 * HomePage reducer
 *
 */

import { fromJS } from 'immutable';
import * as CONSTANT from './constants';

const currentYear = new Date().getFullYear();
const initialState = fromJS({
  isLogged: true,
  filters: {
    sentence: 'ohio',
    trend: {
      active: null,
      list: [
        {
          name: 'Highly rated',
          voteRange: {
            min: 30,
            max: null,
          },
          voteAverage: {
            min: 7,
            max: 10,
          },
        },
        {
          name: 'Most Popular',
          voteRange: {
            min: 75,
            max: null,
          },
          voteAverage: {
            min: null,
            max: null,
          },
        },
        {
          name: 'Underestimated',
          voteRange: {
            min: 5,
            max: 30,
          },
          voteAverage: {
            min: 7,
            max: 10,
          },
        },
      ],
    },
    decade: {
      active: null,
      list: [
        {
          name: '2010s',
          rangeMin: '2010-01-01',
          rangeMax: `${currentYear}-01-01`,
        },
        {
          name: '2000s',
          rangeMin: '2000-01-01',
          rangeMax: '2009-01-01',
        },
        {
          name: '1990s',
          rangeMin: '1990-01-01',
          rangeMax: '1999-01-01',
        },
        {
          name: '1980s',
          rangeMin: '1980-01-01',
          rangeMax: '1989-01-01',
        },
        {
          name: '1970s',
          rangeMin: '1970-01-01',
          rangeMax: '1979-01-01',
        },
        {
          name: '1960s',
          rangeMin: '1960-01-01',
          rangeMax: '1969-01-01',
        },
        {
          name: 'Older',
          rangeMin: '1900-01-01',
          rangeMax: '1959-01-01',
        },
      ],
    },
    genre: {
      active: null,
      list: [],
    },
    range: {
      pages: 0,
      results: 0,
    },
  },
  result: fromJS({
    movie: null,
    movies: null,
    isFetching: false,
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

function appReducer(state = initialState, action) {
  switch (action.type) {
    case CONSTANT.UPDATE_FILTER_DECADE.REQUEST:
      return state
        .setIn(['filters', 'decade', 'active'], action.value);
    case CONSTANT.UPDATE_FILTER_TREND.REQUEST:
      return state
        .setIn(['filters', 'trend', 'active'], action.value);
    case CONSTANT.UPDATE_FILTER_TREND_LIST.REQUEST:
      return state
        .setIn(['filters', 'trend', 'list'], action.value);
    case CONSTANT.UPDATE_FILTER_GENRE.REQUEST:
      return state
        .setIn(['filters', 'genre', 'active'], action.value);
    case CONSTANT.UPDATE_FILTER_GENRE_LIST.SUCCESS:
      return state
        .setIn(['filters', 'genre', 'list'], action.value);
    case CONSTANT.UPDATE_MOVIE_RESULT.REQUEST:
      return state
        .setIn(['result', 'isFetching'], true);
    case CONSTANT.UPDATE_MOVIE_RESULT.SUCCESS:
      return state
        .setIn(['result', 'movie'], action.movie)
        .setIn(['result', 'movies'], action.movies)
        .setIn(['result', 'isFetching'], false);
    case CONSTANT.UPDATE_FILTERS.SUCCESS:
      return state
        .setIn(['filters', 'range', 'pages'], action.totalPages)
        .setIn(['filters', 'range', 'results'], action.totalResults);
    default:
      return state;
  }
}

export default appReducer;
