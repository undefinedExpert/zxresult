/*
 *
 * HomePage reducer
 *
 */

import { fromJS } from 'immutable';
import * as CONSTANT from './constants';

const initialState = fromJS({
  isLogged: true,
  filters: {
    mood: {
      active: {
        id: 28,
        name: 'Action',
      },
      list: [],
    },
    popularity: 'Classical',
    decade: {
      active: {
        name: '90s',
        id: 1990,
      },
      list: [
        {
          name: '90s',
          id: 1990,
        },
        {
          name: '80s',
          id: 1980,
        },
        {
          name: '70s',
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
    case CONSTANT.UPDATE_FILTER_MOOD.REQUEST:
      return state
        .setIn(['filters', 'mood', 'active'], action.value);
    case CONSTANT.UPDATE_FILTER_DECADE.REQUEST:
      return state
        .setIn(['filters', 'decade', 'active'], action.value);
    case CONSTANT.UPDATE_FILTER_GENRE.REQUEST:
      return state
        .setIn(['filters', 'genre', 'active'], action.value);
    case CONSTANT.UPDATE_FILTER_GENRE_LIST.SUCCESS:
      return state
        .setIn(['filters', 'genre', 'list'], action.value);
    case CONSTANT.RESULT_SET:
      return state
        .setIn(['result', 'movie'], action.single)
        .setIn(['result', 'movies'], action.movies);
    default:
      return state;
  }
}

export default appReducer;
