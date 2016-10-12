/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import { createRequestTypes } from 'utils/hooks';


const FILTER_DECADE = createRequestTypes('app/FilterForm/FILTER_DECADE');
const FILTER_DECADE_LIST = createRequestTypes('app/FilterForm/FILTER_DECADE_LIST');

const FILTER_TREND = createRequestTypes('app/FilterForm/FILTER_TREND');
const FILTER_TREND_LIST = createRequestTypes('app/FilterForm/FILTER_TREND_LIST');

const FILTER_GENRE = createRequestTypes('app/FilterForm/FILTER_GENRE');
const FILTER_GENRE_LIST = createRequestTypes('app/FilterForm/FILTER_GENRE_LIST');

const UPDATE_FILTERS = createRequestTypes('app/FilterForm/UPDATE_FILTERS');

const CACHE_RANDOMIZED_PAGE = createRequestTypes('app/FilterForm/CACHE_RANDOMIZED_PAGE');

export {
  FILTER_DECADE,
  FILTER_DECADE_LIST,
  FILTER_TREND,
  FILTER_TREND_LIST,
  FILTER_GENRE,
  FILTER_GENRE_LIST,
  UPDATE_FILTERS,
  CACHE_RANDOMIZED_PAGE,
};
