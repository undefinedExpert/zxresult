/*
 *
 * Movie-search-form constants
 *
 */
import { createRequestTypes } from 'utils/hooks';

// RESULT SET
const UPDATE_MOVIE_RESULT = createRequestTypes('app/App/UPDATE_MOVIE_RESULT');

// Update url SET
const UPDATE_URL = createRequestTypes('app/App/UPDATE_URL');

// Analyse movie results to pick the best
const ANALYSE_MOVIE = createRequestTypes('app/App/ANALYSE_MOVIE');

// Move best movies into QUEUE
const QUEUE_MOVIES = createRequestTypes('app/App/QUEUE_MOVIES');

// Analyse movie results to pick the best
const UPDATE_SINGLE_MOVIE = createRequestTypes('app/App/UPDATE_SINGLE_MOVIE');

// Analyse movie results to pick the best
const UPDATE_VISITED_MOVIES = createRequestTypes('app/App/UPDATE_VISITED_MOVIES');

// Cache random page so user won't see it again
const CACHE_RANDOMIZED_PAGE = createRequestTypes('app/App/CACHE_RANDOMIZED_PAGE');


// API
const apiUrl = 'http://api.themoviedb.org/3';
const apiKey = 'api_key=9dee05d48efe51f51b15cc63b1fee3f5';

export {
  UPDATE_MOVIE_RESULT,
  UPDATE_URL,
  ANALYSE_MOVIE,
  QUEUE_MOVIES,
  UPDATE_SINGLE_MOVIE,
  UPDATE_VISITED_MOVIES,
  CACHE_RANDOMIZED_PAGE,
  apiUrl,
  apiKey,
};
