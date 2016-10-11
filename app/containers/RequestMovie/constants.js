/*
 *
 * Movie-search-form constants
 *
 */
import { createRequestTypes } from 'utils/hooks';

// RESULT SET
const UPDATE_MOVIE_RESULT = createRequestTypes('app/RequestMovie/UPDATE_MOVIE_RESULT');

// Update url SET
const UPDATE_URL = createRequestTypes('app/RequestMovie/UPDATE_URL');

// Analyse movie results to pick the best
const ANALYSE_MOVIE = createRequestTypes('app/RequestMovie/ANALYSE_MOVIE');

// Move best movies into QUEUE
const QUEUE_MOVIES = createRequestTypes('app/RequestMovie/QUEUE_MOVIES');

// Analyse movie results to pick the best
const UPDATE_SINGLE_MOVIE = createRequestTypes('app/RequestMovie/UPDATE_SINGLE_MOVIE');

// Analyse movie results to pick the best
const UPDATE_VISITED_MOVIES = createRequestTypes('app/RequestMovie/UPDATE_VISITED_MOVIES');

export {
  UPDATE_MOVIE_RESULT,
  UPDATE_URL,
  ANALYSE_MOVIE,
  QUEUE_MOVIES,
  UPDATE_SINGLE_MOVIE,
  UPDATE_VISITED_MOVIES,
};
