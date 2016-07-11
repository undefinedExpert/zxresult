/*
 *
 * HomePage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  MOOD_UPDATE,
  GENRE_UPDATE,
  RESULT_SET,
  SENTENCE_UPDATE,
  GET_GENRES_LIST_SUCCESS,
} from './constants';

const initialState = fromJS({
  isLogged: true,
  filters: {
    sentence: 'Get a list of TV show ids that have been edited.',
    mood: 'Funny',
    popularity: 'Classical',
    decade: '90s',
    genre: fromJS({
      id: 28,
      name: 'Action',
    }),
    genreList: [],
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
    case MOOD_UPDATE:
      return state
        .setIn(['filters', 'mood'], action.value);
    case SENTENCE_UPDATE:
      return state
        .setIn(['filters', 'sentence'], action.value);
    case GENRE_UPDATE:
      return state
        .setIn(['filters', 'genre', 'name'], action.value);
    case RESULT_SET:
      return state
        .setIn(['result', 'movie'], action.single)
        .setIn(['result', 'movies'], action.movies);
    case GET_GENRES_LIST_SUCCESS:
      return state
        .setIn(['filters', 'genreList'], action.value);
    default:
      return state;
  }
}

export default appReducer;
