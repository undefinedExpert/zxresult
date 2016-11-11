/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import { action } from 'utils/hooks';

import {
  UPDATE_MOVIE_RESULT,
  ANALYSE_MOVIE,
  UPDATE_SINGLE_MOVIE,
  DETAILS } from './constants';


/**
 * @desc Those actions handles:
 * - Fetches movie
 * - Pushes url
 * - Handles isFetching boolean
 */
export const updateMovieResult = {
  request: () => action(UPDATE_MOVIE_RESULT.REQUEST, {}),
  success: (active) => action(UPDATE_MOVIE_RESULT.SUCCESS, { active }),
  failure: (error) => action(UPDATE_MOVIE_RESULT.FAILURE, { error }),
};


/**
 * @desc Those actions handles:
 * - Analyse & rank movies, after process moves notSorted to pending list.
 */
export const analyseMovies = {
  request: (notSorted) => action(ANALYSE_MOVIE.REQUEST, { notSorted }),
  success: (pending) => action(ANALYSE_MOVIE.SUCCESS, { pending }),
  failure: (error) => action(ANALYSE_MOVIE.FAILURE, { error }),
};


/**
 * @desc Those actions handles:
 * - Update movie result with 1st from pending list
 * - After push removes it from pending list
 */
export const updateSingleMovie = {
  request: (active) => action(UPDATE_SINGLE_MOVIE.REQUEST, { active }),
  success: (removePending) => action(UPDATE_SINGLE_MOVIE.SUCCESS, { removePending }),
  failure: (error) => action(UPDATE_SINGLE_MOVIE.FAILURE, { error }),
};


/**
 * @desc Those actions handles:
 * - Update movie result with 1st from pending list
 * - After push removes it from pending list
 */
export const getDetails = {
  request: () => action(DETAILS.REQUEST, {}),
  success: (updatedActive) => action(DETAILS.SUCCESS, { updatedActive }),
  failure: (error) => action(DETAILS.FAILURE, { error }),
};
