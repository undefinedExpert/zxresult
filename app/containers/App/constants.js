/*
 *
 * Movie-search-form constants
 *
 */
import { createRequestTypes } from 'utils/hooks';

// MOOD CONSTANTS
const UPDATE_FILTER_MOOD = createRequestTypes('app/App/UPDATE_FILTER_MOOD');
const UPDATE_FILTER_MOOD_LIST = createRequestTypes('app/App/UPDATE_FILTER_MOOD_LIST');

// GENRE CONSTANTS
const UPDATE_FILTER_GENRE = createRequestTypes('app/App/UPDATE_FILTER_GENRE');
const UPDATE_FILTER_GENRE_LIST = createRequestTypes('app/App/UPDATE_FILTER_GENRE_LIST');

// const GENRE_UPDATE = 'app/App/GENRE_UPDATE';
const RESULT_SET = 'app/App/RESULT_SET';
const RESULT_SET_ERROR = 'app/App/RESULT_SET_ERROR';
const FILTER_FORM_UPDATE = 'app/App/FILTER_FORM_UPDATE';

// API
const apiUrl = 'http://api.themoviedb.org/3';
const apiKey = 'api_key=9dee05d48efe51f51b15cc63b1fee3f5';

export {
  UPDATE_FILTER_MOOD,
  UPDATE_FILTER_MOOD_LIST,
  UPDATE_FILTER_GENRE,
  UPDATE_FILTER_GENRE_LIST,
  RESULT_SET,
  RESULT_SET_ERROR,
  FILTER_FORM_UPDATE,
  apiUrl,
  apiKey,
};
