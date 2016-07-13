/*
 *
 * Movie-search-form actions
 *
 */

import * as constant from './constants';

function action(type, payload = {}) {
  return { type, ...payload }
}


export const moodUpdate = {
  request: value => action(constant.UPDATE_FILTER_MOOD.REQUEST, { value }),
  success: (value, response) => action(constant.UPDATE_FILTER_MOOD.SUCCESS, { value, response }),
  failure: (value, error) => action(constant.UPDATE_FILTER_MOOD.FAILURE, { value, error }),
};

// export function moodUpdate(value) {
//   return {
//     type: MOOD_UPDATE,
//     value,
//   };
// }

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
