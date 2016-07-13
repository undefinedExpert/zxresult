/*
 *
 * Movie-search-form constants
 *
 */

const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

function createRequestTypes(base) {
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
    acc[type] = `${base}_${type}`; // eslint-disable-line
    return acc;
  }, {});
}

const UPDATE_FILTER_MOOD = createRequestTypes('UPDATE_FILTER_MOOD');
const UPDATE_FILTER_GENRE = createRequestTypes('UPDATE_FILTER_GENRE');

const GENRE_UPDATE = 'app/App/GENRE_UPDATE';
const RESULT_SET = 'app/App/RESULT_SET';
const RESULT_SET_ERROR = 'app/App/RESULT_SET_ERROR';
const FILTER_FORM_UPDATE = 'app/App/FILTER_FORM_UPDATE';

// Get genres for async input field
const GET_GENRES_LIST = 'app/App/GET_GENRES_LIST';
const GET_GENRES_LIST_SUCCESS = 'app/App/GET_GENRES_LIST_SUCCESS';
const GET_GENRES_LIST_ERR = 'app/App/GET_GENRES_LIST_ERR';

// API
const apiUrl = 'http://api.themoviedb.org/3';
const apiKey = 'api_key=9dee05d48efe51f51b15cc63b1fee3f5';

export {
  UPDATE_FILTER_MOOD,
  GENRE_UPDATE,
  RESULT_SET,
  RESULT_SET_ERROR,
  FILTER_FORM_UPDATE,
  GET_GENRES_LIST,
  GET_GENRES_LIST_SUCCESS,
  GET_GENRES_LIST_ERR,
  apiUrl,
  apiKey,
};
