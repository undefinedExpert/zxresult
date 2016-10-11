/**
 * Created by Lansky on 11.10.2016.
 */
// TODO: Change ref links in constants
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

// Update Result filters
const UPDATE_FILTERS = createRequestTypes('app/App/UPDATE_FILTERS');

// Cache random page so user won't see it again
const CACHE_RANDOMIZED_PAGE = createRequestTypes('app/App/CACHE_RANDOMIZED_PAGE');

export {
  UPDATE_FILTER_DECADE,
  UPDATE_FILTER_DECADE_LIST,
  UPDATE_FILTER_TREND,
  UPDATE_FILTER_TREND_LIST,
  UPDATE_FILTER_GENRE,
  UPDATE_FILTER_GENRE_LIST,
  UPDATE_FILTERS,
  CACHE_RANDOMIZED_PAGE,
};

