/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import { action } from 'utils/hooks';

import {
  FILTER_DECADE,
  FILTER_DECADE_LIST,
  FILTER_TREND,
  FILTER_TREND_LIST,
  FILTER_GENRE,
  FILTER_GENRE_LIST,
  UPDATE_FILTERS,
  CACHE_RANDOMIZED_PAGE } from './constants';


/**
 * genreActive, genreList
 * @desc Those actions handles:
 * - setting as active
 * - setting list
 * - getting list
 */
const genreActive = {
  request: value => action(FILTER_GENRE.REQUEST, { value }),
  success: (value) => action(FILTER_GENRE.SUCCESS, { value }),
  failure: (value, error) => action(FILTER_GENRE.FAILURE, { value, error }),
};
const genreList = {
  request: () => action(FILTER_GENRE_LIST.REQUEST, {}),
  success: (value, response) => action(FILTER_GENRE_LIST.SUCCESS, { value, response }),
  failure: (value, error) => action(FILTER_GENRE_LIST.FAILURE, { value, error }),
};

export const updateFilterGenre = {
  active: genreActive,
  list: genreList,
};


/**
 * decadeActive, decadeList
 * @desc Those actions handles:
 * - Get list
 * - Set active
 */
const decadeActive = {
  request: value => action(FILTER_DECADE.REQUEST, { value }),
  success: (value, response) => action(FILTER_DECADE.SUCCESS, { value, response }),
  failure: (value, error) => action(FILTER_DECADE.FAILURE, { value, error }),
};
const decadeList = {
  request: value => action(FILTER_DECADE_LIST.REQUEST, { value }),
  success: (value, response) => action(FILTER_DECADE_LIST.SUCCESS, { value, response }),
  failure: (value, error) => action(FILTER_DECADE_LIST.FAILURE, { value, error }),
};


export const updateFilterDecade = {
  active: decadeActive,
  list: decadeList,
};

/**
 * trendActive, trendList
 * @desc Those actions handles:
 * - Get list
 * - Set active
 */
const trendActive = {
  request: value => action(FILTER_TREND.REQUEST, { value }),
  success: (value, response) => action(FILTER_TREND.SUCCESS, { value, response }),
  failure: (value, error) => action(FILTER_TREND.FAILURE, { value, error }),
};

const trendList = {
  request: value => action(FILTER_TREND_LIST.REQUEST, { value }),
  success: (value, response) => action(FILTER_TREND_LIST.SUCCESS, { value, response }),
  failure: (value, error) => action(FILTER_TREND_LIST.FAILURE, { value, error }),
};

export const updateFilterTrend = {
  active: trendActive,
  list: trendList,
};


/**
 * updateFilters
 * @desc This action handles:
 * - Get list
 * - Resets values: cached pages, pending list
 * - Get movies range basing on current filters state
 */
export const updateFilters = {
  request: () => action(UPDATE_FILTERS.REQUEST, {}),
  success: (totalPages, totalResults) => action(UPDATE_FILTERS.SUCCESS, { totalPages, totalResults }),
  failure: (error) => action(UPDATE_FILTERS.FAILURE, { error }),
};

/**
 * cacheRandomizedPage
 * @desc This action handles:
 * - Caches random page, so user won't see it once again
 */
export const cacheRandomizedPage = {
  request: (pagesLeft) => action(CACHE_RANDOMIZED_PAGE.REQUEST, { pagesLeft }),
  success: () => action(CACHE_RANDOMIZED_PAGE.SUCCESS, {}),
  failure: (error) => action(CACHE_RANDOMIZED_PAGE.FAILURE, { error }),
};
