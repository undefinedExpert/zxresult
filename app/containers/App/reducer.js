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
} from './constants';

const initialState = fromJS({
  isLogged: true,
  filters: {
    mood: 'Funny',
    trend: 'Classical',
    decade: '90s',
    genre: 'action',
    genreList: [
      {
        id: 28,
        name: 'Action',
      },
      {
        id: 12,
        name: 'Adventure',
      },
      {
        id: 16,
        name: 'Animation',
      },
      {
        id: 35,
        name: 'Comedy',
      },
      {
        id: 80,
        name: 'Crime',
      },
      {
        id: 99,
        name: 'Documentary',
      },
      {
        id: 18,
        name: 'Drama',
      },
      {
        id: 10751,
        name: 'Family',
      },
      {
        id: 14,
        name: 'Fantasy',
      },
      {
        id: 10769,
        name: 'Foreign',
      },
      {
        id: 36,
        name: 'History',
      },
      {
        id: 27,
        name: 'Horror',
      },
      {
        id: 10402,
        name: 'Music',
      },
      {
        id: 9648,
        name: 'Mystery',
      },
      {
        id: 10749,
        name: 'Romance',
      },
      {
        id: 878,
        name: 'Science Fiction',
      },
      {
        id: 10770,
        name: 'TV Movie',
      },
      {
        id: 53,
        name: 'Thriller',
      },
      {
        id: 10752,
        name: 'War',
      },
      {
        id: 37,
        name: 'Western',
      },
    ],
  },
  result: {
    movie: null,
    movies: null,
  },
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
    case GENRE_UPDATE:
      return state
        .setIn(['filters', 'genre'], action.value);
    case RESULT_SET:
      return state
        .setIn(['result', 'movie'], action.single)
        .setIn(['result', 'movies'], action.movies);
    default:
      return state;
  }
}

export default appReducer;
