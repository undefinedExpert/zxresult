/*
 *
 * MovieSearchForm actions
 *
 */

import {
  MOOD_UPDATE,
  GENRE_UPDATE,
  RESULT_SET,
  RESULT_SET_ERROR,
} from './constants';

export function moodUpdate(value) {
  return {
    type: MOOD_UPDATE,
    value,
  };
}

export function genreUpdate(value) {
  return {
    type: GENRE_UPDATE,
    value,
  };
}

export function resultSet(movies, single) {
  return {
    type: RESULT_SET,
    movies,
    single,
  };
}

// {
//   moodUpdate as mood,
//   defaultAction,
// };
