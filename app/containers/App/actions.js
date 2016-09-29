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
  request: value => action(CONSTANT.UPDATE_FILTER_DECADE_LIST.REQUEST, { value }),
  success: (value, response) => action(CONSTANT.UPDATE_FILTER_DECADE_LIST.SUCCESS, { value, response }),
  failure: (value, error) => action(CONSTANT.UPDATE_FILTER_DECADE_LIST.FAILURE, { value, error }),
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
  request: value => action(CONSTANT.UPDATE_FILTER_TREND_LIST.REQUEST, { value }),
  success: (value, response) => action(CONSTANT.UPDATE_FILTER_TREND_LIST.SUCCESS, { value, response }),
  failure: (value, error) => action(CONSTANT.UPDATE_FILTER_TREND_LIST.FAILURE, { value, error }),
};

export const updateFilterTrend = {
  active: trendActive,
  list: trendList,
};

// Result set Actions
//
export const updateMovieResult = {
  request: () => action(CONSTANT.UPDATE_MOVIE_RESULT.REQUEST, {}),
  success: (movie) => action(CONSTANT.UPDATE_MOVIE_RESULT.SUCCESS, { movie }),
  failure: (error) => action(CONSTANT.UPDATE_MOVIE_RESULT.FAILURE, { error }),
};

// Update url
//
export const updateUrl = {
  request: () => action(CONSTANT.UPDATE_URL.REQUEST, {}),
  success: (response) => action(CONSTANT.UPDATE_URL.SUCCESS, { response }),
  failure: (error) => action(CONSTANT.UPDATE_URL.FAILURE, { error }),
};

// Update filters
//
export const updateFilters = {
  request: () => action(CONSTANT.UPDATE_FILTERS.REQUEST, {}),
  success: (totalPages, totalResults) => action(CONSTANT.UPDATE_FILTERS.SUCCESS, { totalPages, totalResults }),
  failure: (error) => action(CONSTANT.UPDATE_FILTERS.FAILURE, { error }),
};

// Analyse movies
//
export const analyseMovies = {
  request: (movies) => action(CONSTANT.ANALYSE_MOVIE.REQUEST, { movies }),
  success: (movie, viewed) => action(CONSTANT.ANALYSE_MOVIE.SUCCESS, { movie, viewed }),
  failure: (error) => action(CONSTANT.ANALYSE_MOVIE.FAILURE, { error }),
};

// Queue movies
//
export const queueMovies = {
  request: (movies) => action(CONSTANT.QUEUE_MOVIES.REQUEST, { movies }),
  success: (pendingMovies) => action(CONSTANT.QUEUE_MOVIES.SUCCESS, { pendingMovies }),
  failure: (error) => action(CONSTANT.QUEUE_MOVIES.FAILURE, { error }),
};

// Queue movies
//
export const updateSingleMovie = {
  request: (updatedMovie) => action(CONSTANT.UPDATE_SINGLE_MOVIE.REQUEST, { updatedMovie }),
  success: () => action(CONSTANT.UPDATE_SINGLE_MOVIE.SUCCESS, {}),
  failure: (error) => action(CONSTANT.UPDATE_SINGLE_MOVIE.FAILURE, { error }),
};

