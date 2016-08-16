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

// Decade Update Actions
//
const decadeActive = {
  request: value => action(CONSTANT.UPDATE_FILTER_DECADE.REQUEST, { value }),
  success: (value, response) => action(CONSTANT.UPDATE_FILTER_DECADE.SUCCESS, { value, response }),
  failure: (value, error) => action(CONSTANT.UPDATE_FILTER_DECADE.FAILURE, { value, error }),
};

const decadeList = {
  request: value => action(CONSTANT.UPDATE_FILTER_DECADE.REQUEST, { value }),
  success: (value, response) => action(CONSTANT.UPDATE_FILTER_DECADE.SUCCESS, { value, response }),
  failure: (value, error) => action(CONSTANT.UPDATE_FILTER_DECADE.FAILURE, { value, error }),
};

export const updateFilterDecade = {
  active: decadeActive,
  list: decadeList,
};


// TEMPORARY FUNCTIONS
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

