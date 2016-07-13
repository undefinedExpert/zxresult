/*
 *
 * Movie-search-form actions
 *
 */

import * as CONSTANT from './constants';

function action(type, payload = {}) {
  return { type, ...payload };
}


export const moodUpdate = {
  request: value => action(CONSTANT.UPDATE_FILTER_MOOD.REQUEST, { value }),
  success: (value, response) => action(CONSTANT.UPDATE_FILTER_MOOD.SUCCESS, { value, response }),
  failure: (value, error) => action(CONSTANT.UPDATE_FILTER_MOOD.FAILURE, { value, error }),
};

// export function moodUpdate(value) {
//   return {
//     type: MOOD_UPDATE,
//     value,
//   };
// }

export function genreUpdate(value) {
  return {
    type: CONSTANT.GENRE_UPDATE,
    value,
  };
}

// TODO: Refactor
export function filterFormUpdate() {
  return {
    type: CONSTANT.FILTER_FORM_UPDATE,
  };
}

export function resultSet(movies, single) {
  return {
    type: CONSTANT.RESULT_SET,
    movies,
    single,
  };
}


export function genreListSet() {
  return {
    type: CONSTANT.GET_GENRES_LIST,
  };
}

export function genreListSetSuccess(value) {
  return {
    type: CONSTANT.GET_GENRES_LIST_SUCCESS,
    value,
  };
}
