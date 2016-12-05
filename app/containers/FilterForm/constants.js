/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import { createConstantTypes } from 'mechanisms/index';


const FILTER_KEYWORD = createConstantTypes('app/FilterForm/FILTER_KEYWORD');
const FILTER_KEYWORD_LIST = createConstantTypes('app/FilterForm/FILTER_KEYWORD_LIST');

const FILTER_DECADE = createConstantTypes('app/FilterForm/FILTER_DECADE');
const FILTER_DECADE_LIST = createConstantTypes('app/FilterForm/FILTER_DECADE_LIST');

const FILTER_TREND = createConstantTypes('app/FilterForm/FILTER_TREND');
const FILTER_TREND_LIST = createConstantTypes('app/FilterForm/FILTER_TREND_LIST');

const FILTER_GENRE = createConstantTypes('app/FilterForm/FILTER_GENRE');
const FILTER_GENRE_LIST = createConstantTypes('app/FilterForm/FILTER_GENRE_LIST');

const UPDATE_FILTERS = createConstantTypes('app/FilterForm/UPDATE_FILTERS');

const CACHE_RANDOMIZED_PAGE = createConstantTypes('app/FilterForm/CACHE_RANDOMIZED_PAGE');

export {
  FILTER_KEYWORD,
  FILTER_KEYWORD_LIST,
  FILTER_DECADE,
  FILTER_DECADE_LIST,
  FILTER_TREND,
  FILTER_TREND_LIST,
  FILTER_GENRE,
  FILTER_GENRE_LIST,
  UPDATE_FILTERS,
  CACHE_RANDOMIZED_PAGE,
};
