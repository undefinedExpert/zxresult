/*
 *
 * HomePage reducer
 *
 */

import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import * as CONSTANT from './constants';

const initialState = fromJS({
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
        name: '1990s',
        id: 1990,
      },
      list: [
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

function appReducer(state = initialState, action) {

  if (action.type === LOCATION_CHANGE) {
    // TODO: Fix
    console.log('i chuj');
  }

  switch (action.type) {
    case CONSTANT.UPDATE_FILTER_DECADE.REQUEST:
      return state
        .setIn(['filters', 'decade', 'active'], action.value);
    case CONSTANT.UPDATE_FILTER_TREND.REQUEST:
      return state
        .setIn(['filters', 'trend', 'active'], action.value);
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
        .setIn(['result', 'resultsRange'], action.resultsRange);
    default:
      return state;
  }
}

export default appReducer;
