/*
 *
 * Movie-search-form actions
 *
 */

import {
  MOOD_UPDATE,
  GENRE_UPDATE,
  RESULT_SET,
  FILTER_FORM_UPDATE,
  GET_GENRES_LIST,
  GET_GENRES_LIST_SUCCESS,
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

// TODO: Refactor
export function filterFormUpdate() {
  return {
    type: FILTER_FORM_UPDATE,
  };
}

export function resultSet(movies, single) {
  return {
    type: RESULT_SET,
    movies,
    single,
  };
}


export function genreListSet() {
  return {
    type: GET_GENRES_LIST,
  };
}

export function genreListSetSuccess(value) {
  return {
    type: GET_GENRES_LIST_SUCCESS,
    value,
  };
}
