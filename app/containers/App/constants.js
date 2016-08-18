/*
 *
 * Movie-search-form constants
 *
 */
import { createRequestTypes } from 'utils/hooks';

// DECADE CONSTANTS
const UPDATE_FILTER_DECADE = createRequestTypes('app/App/UPDATE_FILTER_DECADE');
const UPDATE_FILTER_DECADE_LIST = createRequestTypes('app/App/UPDATE_FILTER_DECADE_LIST');

// TREND CONSTANTS
const UPDATE_FILTER_TREND = createRequestTypes('app/App/UPDATE_FILTER_TREND');
const UPDATE_FILTER_TREND_LIST = createRequestTypes('app/App/UPDATE_FILTER_TREND_LIST');

// GENRE CONSTANTS
const UPDATE_FILTER_GENRE = createRequestTypes('app/App/UPDATE_FILTER_GENRE');
const UPDATE_FILTER_GENRE_LIST = createRequestTypes('app/App/UPDATE_FILTER_GENRE_LIST');

// RESULT SET
const UPDATE_MOVIE_RESULT = createRequestTypes('app/App/UPDATE_MOVIE_RESULT');

// const GENRE_UPDATE = 'app/App/GENRE_UPDATE';
const RESULT_SET = 'app/App/RESULT_SET';
const RESULT_SET_ERROR = 'app/App/RESULT_SET_ERROR';
const FILTER_FORM_UPDATE = 'app/App/FILTER_FORM_UPDATE';

// API
const apiUrl = 'http://api.themoviedb.org/3';
const apiKey = 'api_key=9dee05d48efe51f51b15cc63b1fee3f5';

export {
  UPDATE_FILTER_DECADE,
  UPDATE_FILTER_DECADE_LIST,
  UPDATE_FILTER_TREND,
  UPDATE_FILTER_TREND_LIST,
  UPDATE_FILTER_GENRE,
  UPDATE_FILTER_GENRE_LIST,
  UPDATE_MOVIE_RESULT,
  RESULT_SET,
  RESULT_SET_ERROR,
  FILTER_FORM_UPDATE,
  apiUrl,
  apiKey,
};
