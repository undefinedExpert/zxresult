/*
 *
 * Movie-search-form actions
 *
 */

import * as CONSTANT from './constants';

function action(type, payload = {}) {
  return { type, ...payload };
}

// Result set Actions
//
export const updateMovieResult = {
  request: () => action(CONSTANT.UPDATE_MOVIE_RESULT.REQUEST, {}),
  success: (active) => action(CONSTANT.UPDATE_MOVIE_RESULT.SUCCESS, { active }),
  failure: (error) => action(CONSTANT.UPDATE_MOVIE_RESULT.FAILURE, { error }),
};

// Update url
//
export const updateUrl = {
  request: () => action(CONSTANT.UPDATE_URL.REQUEST, {}),
  success: (response) => action(CONSTANT.UPDATE_URL.SUCCESS, { response }),
  failure: (error) => action(CONSTANT.UPDATE_URL.FAILURE, { error }),
};

// Analyse movies
//
export const analyseMovies = {
  request: (notSorted) => action(CONSTANT.ANALYSE_MOVIE.REQUEST, { notSorted }),
  success: (active, viewed) => action(CONSTANT.ANALYSE_MOVIE.SUCCESS, { active, viewed }),
  failure: (error) => action(CONSTANT.ANALYSE_MOVIE.FAILURE, { error }),
};

// Queue movies
//
export const queueMovies = {
  request: (notSorted) => action(CONSTANT.QUEUE_MOVIES.REQUEST, { notSorted }),
  success: (pending) => action(CONSTANT.QUEUE_MOVIES.SUCCESS, { pending }),
  failure: (error) => action(CONSTANT.QUEUE_MOVIES.FAILURE, { error }),
};

// updateSingleMovie
//
export const updateSingleMovie = {
  request: (active) => action(CONSTANT.UPDATE_SINGLE_MOVIE.REQUEST, { active }),
  success: (removePending) => action(CONSTANT.UPDATE_SINGLE_MOVIE.SUCCESS, { removePending }),
  failure: (error) => action(CONSTANT.UPDATE_SINGLE_MOVIE.FAILURE, { error }),
};

// Queue movies
//
export const moveToVisitedMovies = {
  request: (visited) => action(CONSTANT.UPDATE_SINGLE_MOVIE.REQUEST, { visited }),
  success: () => action(CONSTANT.UPDATE_SINGLE_MOVIE.SUCCESS, {}),
  failure: (error) => action(CONSTANT.UPDATE_SINGLE_MOVIE.FAILURE, { error }),
};
