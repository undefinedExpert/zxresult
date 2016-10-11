import * as CONSTANT from './constants';

function action(type, payload = {}) {
  return { type, ...payload };
}

// Genre Update Actions
//
const genreActive = {
  request: value => action(CONSTANT.UPDATE_FILTER_GENRE.REQUEST, { value }),
  success: (value, response) => action(CONSTANT.UPDATE_FILTER_GENRE.SUCCESS, { value, response }),
  failure: (value, error) => action(CONSTANT.UPDATE_FILTER_GENRE.FAILURE, { value, error }),
};

const genreList = {
  request: () => action(CONSTANT.UPDATE_FILTER_GENRE_LIST.REQUEST, {}),
  success: (value, response) => action(CONSTANT.UPDATE_FILTER_GENRE_LIST.SUCCESS, { value, response }),
  failure: (value, error) => action(CONSTANT.UPDATE_FILTER_GENRE_LIST.FAILURE, { value, error }),
};

export const updateFilterGenre = {
  active: genreActive,
  list: genreList,
};

// Decade Update Actions
//
const decadeActive = {
  request: value => action(CONSTANT.UPDATE_FILTER_DECADE.REQUEST, { value }),
  success: (value, response) => action(CONSTANT.UPDATE_FILTER_DECADE.SUCCESS, { value, response }),
  failure: (value, error) => action(CONSTANT.UPDATE_FILTER_DECADE.FAILURE, { value, error }),
};

const decadeList = {
  request: value => action(CONSTANT.UPDATE_FILTER_DECADE_LIST.REQUEST, { value }),
  success: (value, response) => action(CONSTANT.UPDATE_FILTER_DECADE_LIST.SUCCESS, { value, response }),
  failure: (value, error) => action(CONSTANT.UPDATE_FILTER_DECADE_LIST.FAILURE, { value, error }),
};

export const updateFilterDecade = {
  active: decadeActive,
  list: decadeList,
};

// Trend Update Actions
//
const trendActive = {
  request: value => action(CONSTANT.UPDATE_FILTER_TREND.REQUEST, { value }),
  success: (value, response) => action(CONSTANT.UPDATE_FILTER_TREND.SUCCESS, { value, response }),
  failure: (value, error) => action(CONSTANT.UPDATE_FILTER_TREND.FAILURE, { value, error }),
};

const trendList = {
  request: value => action(CONSTANT.UPDATE_FILTER_TREND_LIST.REQUEST, { value }),
  success: (value, response) => action(CONSTANT.UPDATE_FILTER_TREND_LIST.SUCCESS, { value, response }),
  failure: (value, error) => action(CONSTANT.UPDATE_FILTER_TREND_LIST.FAILURE, { value, error }),
};

export const updateFilterTrend = {
  active: trendActive,
  list: trendList,
};


// Update filters
//
export const updateFilters = {
  request: () => action(CONSTANT.UPDATE_FILTERS.REQUEST, {}),
  success: (totalPages, totalResults) => action(CONSTANT.UPDATE_FILTERS.SUCCESS, { totalPages, totalResults }),
  failure: (error) => action(CONSTANT.UPDATE_FILTERS.FAILURE, { error }),
};
