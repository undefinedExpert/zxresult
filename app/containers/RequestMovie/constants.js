/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import { createRequestTypes } from 'utils/hooks';

// RESULT SET
const UPDATE_MOVIE_RESULT = createRequestTypes('app/RequestMovie/UPDATE_MOVIE_RESULT');

// Analyse movie results to pick the best
const ANALYSE_MOVIE = createRequestTypes('app/RequestMovie/ANALYSE_MOVIE');

// Analyse movie results to pick the best
const UPDATE_SINGLE_MOVIE = createRequestTypes('app/RequestMovie/UPDATE_SINGLE_MOVIE');

// Get movie details
const DETAILS = createRequestTypes('app/RequestMovie/DETAILS');

export {
  UPDATE_MOVIE_RESULT,
  ANALYSE_MOVIE,
  UPDATE_SINGLE_MOVIE,
  DETAILS,
};
