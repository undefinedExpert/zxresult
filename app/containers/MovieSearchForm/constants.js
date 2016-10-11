/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import { createRequestTypes } from 'utils/hooks';

// DECADE CONSTANTS
const UPDATE_FILTER_DECADE = createRequestTypes('app/MovieSearchForm/UPDATE_FILTER_DECADE');
const UPDATE_FILTER_DECADE_LIST = createRequestTypes('app/MovieSearchForm/UPDATE_FILTER_DECADE_LIST');

// TREND CONSTANTS
const UPDATE_FILTER_TREND = createRequestTypes('app/MovieSearchForm/UPDATE_FILTER_TREND');
const UPDATE_FILTER_TREND_LIST = createRequestTypes('app/MovieSearchForm/UPDATE_FILTER_TREND_LIST');

// GENRE CONSTANTS
const UPDATE_FILTER_GENRE = createRequestTypes('app/MovieSearchForm/UPDATE_FILTER_GENRE');
const UPDATE_FILTER_GENRE_LIST = createRequestTypes('app/MovieSearchForm/UPDATE_FILTER_GENRE_LIST');

// Update Result filters
const UPDATE_FILTERS = createRequestTypes('app/MovieSearchForm/UPDATE_FILTERS');

export {
  UPDATE_FILTER_DECADE,
  UPDATE_FILTER_DECADE_LIST,
  UPDATE_FILTER_TREND,
  UPDATE_FILTER_TREND_LIST,
  UPDATE_FILTER_GENRE,
  UPDATE_FILTER_GENRE_LIST,
  UPDATE_FILTERS,
};
