/*
 *
 * Movie-search-form actions
 *
 */

import * as CONSTANT from './constants';

function action(type, payload = {}) {
  return { type, ...payload };
}

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

// Trend Update Actions
//
const trendActive = {
  request: value => action(CONSTANT.UPDATE_FILTER_TREND.REQUEST, { value }),
  success: (value, response) => action(CONSTANT.UPDATE_FILTER_TREND.SUCCESS, { value, response }),
  failure: (value, error) => action(CONSTANT.UPDATE_FILTER_TREND.FAILURE, { value, error }),
};

const trendList = {
  request: value => action(CONSTANT.UPDATE_FILTER_TREND.REQUEST, { value }),
  success: (value, response) => action(CONSTANT.UPDATE_FILTER_TREND.SUCCESS, { value, response }),
  failure: (value, error) => action(CONSTANT.UPDATE_FILTER_TREND.FAILURE, { value, error }),
};

export const updateFilterTrend = {
  active: trendActive,
  list: trendList,
};

// Result set Actions
//
export const updateMovieResult = {
  request: () => action(CONSTANT.UPDATE_MOVIE_RESULT.REQUEST, {}),
  success: (movies, movie, response) => action(CONSTANT.UPDATE_MOVIE_RESULT.SUCCESS, { movies, movie, response }),
  failure: (movies, movie, error) => action(CONSTANT.UPDATE_MOVIE_RESULT.FAILURE, { movies, movie, error }),
};

// Update url
//
export const updateUrl = {
  request: (url) => action(CONSTANT.UPDATE_MOVIE_RESULT.REQUEST, { url }),
  success: (response) => action(CONSTANT.UPDATE_MOVIE_RESULT.SUCCESS, { response }),
  failure: (error) => action(CONSTANT.UPDATE_MOVIE_RESULT.FAILURE, { error }),
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

