/*
 *
 * Movie-search-form actions
 *
 */

import * as CONSTANT from './constants';

function action(type, payload = {}) {
  return { type, ...payload };
}

// Mood Update Actions
//
//
const moodActive = {
  request: value => action(CONSTANT.UPDATE_FILTER_MOOD.REQUEST, { value }),
  success: (value, response) => action(CONSTANT.UPDATE_FILTER_MOOD.SUCCESS, { value, response }),
  failure: (value, error) => action(CONSTANT.UPDATE_FILTER_MOOD.FAILURE, { value, error }),
};

const moodList = {
  request: value => action(CONSTANT.UPDATE_FILTER_MOOD.REQUEST, { value }),
  success: (value, response) => action(CONSTANT.UPDATE_FILTER_MOOD.SUCCESS, { value, response }),
  failure: (value, error) => action(CONSTANT.UPDATE_FILTER_MOOD.FAILURE, { value, error }),
};

export const updateFilterMood = {
  active: moodActive,
  list: moodList,
};


// Genre Update Actions
//
//
const genreActive = {
  request: value => action(CONSTANT.UPDATE_FILTER_GENRE.REQUEST, { value }),
  success: (value, response) => action(CONSTANT.UPDATE_FILTER_GENRE.SUCCESS, { value, response }),
  failure: (value, error) => action(CONSTANT.UPDATE_FILTER_GENRE.FAILURE, { value, error }),
};

const genreList = {
  request: () => action(CONSTANT.UPDATE_FILTER_GENRE_LIST.REQUEST, {}),
  success: (value, response) => action(CONSTANT.UPDATE_FILTER_GENRE_LIST.SUCCESS, { value, response }),
  failure: (value, error) => action(CONSTANT.UPDATE_FILTER_GENRE_LIST.FAILURE, { value, error }),
};

export const updateFilterGenre = {
  active: genreActive,
  list: genreList,
};

// export function genreUpdate(value) {
//   return {
//     type: CONSTANT.GENRE_UPDATE,
//     value,
//   };
// }
//
// export function genreListSet() {
//   return {
//     type: CONSTANT.GET_GENRES_LIST,
//   };
// }
//
// export function genreListSetSuccess(value) {
//   return {
//     type: CONSTANT.GET_GENRES_LIST_SUCCESS,
//     value,
//   };
// }


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

