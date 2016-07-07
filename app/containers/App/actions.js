/*
 *
 * MovieSearchForm actions
 *
 */

import {
  MOOD_UPDATE,
  GENRE_UPDATE,
  RESULT_SET,
  FILTER_FORM_UPDATE,
  SENTENCE_UPDATE,
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

export function sentenceUpdate(value) {
  return {
    type: SENTENCE_UPDATE,
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

//TODO: Refactor
export function filterFormUpdate() {
  return {
    type: FILTER_FORM_UPDATE,
  };
}

// {
//   moodUpdate as mood,
//   defaultAction,
// };
