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
          voteAverageMin: 7,
          voteAverageMax: 10,
          voteCountMin: 30,
          voteCountMax: null,
        },
        {
          name: 'Most Popular',
          voteAverageMin: null,
          voteAverageMax: null,
          voteCountMin: 75,
          voteCountMax: null,
        },
        {
          name: 'Underestimated',
          voteAverageMin: 7,
          voteAverageMax: 10,
          voteCountMin: 20,
          voteCountMax: 10,
        },
      ],
      apiParamName: {
        voteAverageMin: 'vote_average.gte',
        voteAverageMax: 'vote_average.lte',
        voteCountMax: 'vote_count.gte',
        voteCountMin: 'vote_count.lte',
      },
    },
    decade: {
      active: null,
      list: [
        {
          name: '2010s',
          dateMin: '2010-01-01',
          dateMax: `${currentYear}-01-01`,
        },
        {
          name: '2000s',
          dateMin: '2000-01-01',
          dateMax: '2009-01-01',
        },
        {
          name: '1990s',
          dateMin: '1990-01-01',
          dateMax: '1999-01-01',
        },
        {
          name: '1980s',
          dateMin: '1980-01-01',
          dateMax: '1989-01-01',
        },
        {
          name: '1970s',
          dateMin: '1970-01-01',
          dateMax: '1979-01-01',
        },
        {
          name: '1960s',
          dateMin: '1960-01-01',
          dateMax: '1969-01-01',
        },
        {
          name: 'Older',
          dateMin: '1900-01-01',
          dateMax: '1959-01-01',
        },
      ],
      apiParamName: {
        dateMin: 'primary_release_date.gte',
        dateMax: 'primary_release_date.lte',
      },
    },
    genre: {
      active: null,
      list: [],
      apiParamName: 'with_genres',
    },
    range: {
      pages: 0,
      results: 0,
    },
  },
  result: fromJS({
    movie: null,
    movies: [],
    pendingMovies: [],
    visitedMovies: [],
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
        .setIn(['result', 'isFetching'], false);
    case CONSTANT.ANALYSE_MOVIE.REQUEST:
      return state
        .setIn(['result', 'movies'], action.movies);
    case CONSTANT.QUEUE_MOVIES.SUCCESS:
      return state
        .setIn(['result', 'pendingMovies'], action.pendingMovies)
        .setIn(['result', 'isFetching'], false);
    case CONSTANT.QUEUE_MOVIES.FAILURE:
      return state
        .setIn(['result', 'isFetching'], false);
    case CONSTANT.UPDATE_SINGLE_MOVIE.SUCCESS:
      return state
        .setIn(['result', 'pendingMovies'], action.removeFromPending)
    case CONSTANT.UPDATE_FILTERS.SUCCESS:
      return state
        .setIn(['filters', 'range', 'pages'], action.totalPages)
        .setIn(['filters', 'range', 'results'], action.totalResults)
        .setIn(['result', 'pendingMovies'], []);

    default:
      return state;
  }
}

export default appReducer;
