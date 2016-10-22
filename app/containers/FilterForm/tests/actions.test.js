/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import { expect } from 'chai';

import * as CONSTANT from './../constants';
import {
  updateFilterGenre,
  updateFilterDecade,
  updateFilterTrend,
  updateFilters,
  cacheRandomizedPage,
} from './../actions';


describe('FilterForm Actions', () => {
  describe('updateFilterGenre()', () => {
    let value;
    let response;
    let error;
    beforeEach(() => {
      value = 'value';
      response = 'response';
      error = 'error';
    });

    it('Should call actions from genreActive - requested, succeed, failed', () => {
      const expected = {
        request: {
          type: CONSTANT.FILTER_GENRE.REQUEST,
          value,
        },
        success: {
          type: CONSTANT.FILTER_GENRE.SUCCESS,
          value,
        },
        failure: {
          type: CONSTANT.FILTER_GENRE.FAILURE,
          value,
          error,
        },
      };

      expect(updateFilterGenre.active.request(value)).to.eql(expected.request);
      expect(updateFilterGenre.active.success(value)).to.eql(expected.success);
      expect(updateFilterGenre.active.failure(value, error)).to.eql(expected.failure);
    });

    it('Should call actions from genreList - requested, succeed, failed', () => {
      const expected = {
        request: {
          type: CONSTANT.FILTER_GENRE_LIST.REQUEST,
        },
        success: {
          type: CONSTANT.FILTER_GENRE_LIST.SUCCESS,
          value,
          response,
        },
        failure: {
          type: CONSTANT.FILTER_GENRE_LIST.FAILURE,
          value,
          error,
        },
      };

      expect(updateFilterGenre.list.request()).to.eql(expected.request);
      expect(updateFilterGenre.list.success(value, response)).to.eql(expected.success);
      expect(updateFilterGenre.list.failure(value, error)).to.eql(expected.failure);
    });
  });

  describe('updateFilterDecade()', () => {
    let value;
    let response;
    let error;
    beforeEach(() => {
      value = 'value';
      response = 'response';
      error = 'error';
    });

    it('Should call actions from decadeActive - requested, succeed, failed', () => {
      const expected = {
        request: {
          type: CONSTANT.FILTER_DECADE.REQUEST,
          value,
        },
        success: {
          type: CONSTANT.FILTER_DECADE.SUCCESS,
          value,
          response,
        },
        failure: {
          type: CONSTANT.FILTER_DECADE.FAILURE,
          value,
          error,
        },
      };

      expect(updateFilterDecade.active.request(value)).to.eql(expected.request);
      expect(updateFilterDecade.active.success(value, response)).to.eql(expected.success);
      expect(updateFilterDecade.active.failure(value, error)).to.eql(expected.failure);
    });

    it('Should call actions from decadeList - requested, succeed, failed', () => {
      const expected = {
        request: {
          type: CONSTANT.FILTER_DECADE_LIST.REQUEST,
          value,
        },
        success: {
          type: CONSTANT.FILTER_DECADE_LIST.SUCCESS,
          value,
          response,
        },
        failure: {
          type: CONSTANT.FILTER_DECADE_LIST.FAILURE,
          value,
          error,
        },
      };

      expect(updateFilterDecade.list.request(value)).to.eql(expected.request);
      expect(updateFilterDecade.list.success(value, response)).to.eql(expected.success);
      expect(updateFilterDecade.list.failure(value, error)).to.eql(expected.failure);
    });
  });

  describe('updateFilterTrend()', () => {
    let value;
    let response;
    let error;
    beforeEach(() => {
      value = 'value';
      response = 'response';
      error = 'error';
    });

    it('Should call actions from trendActive - requested, succeed, failed', () => {
      const expected = {
        request: {
          type: CONSTANT.FILTER_TREND.REQUEST,
          value,
        },
        success: {
          type: CONSTANT.FILTER_TREND.SUCCESS,
          value,
          response,
        },
        failure: {
          type: CONSTANT.FILTER_TREND.FAILURE,
          value,
          error,
        },
      };

      expect(updateFilterTrend.active.request(value)).to.eql(expected.request);
      expect(updateFilterTrend.active.success(value, response)).to.eql(expected.success);
      expect(updateFilterTrend.active.failure(value, error)).to.eql(expected.failure);
    });

    it('Should call actions from decadeList - requested, succeed, failed', () => {
      const expected = {
        request: {
          type: CONSTANT.FILTER_TREND_LIST.REQUEST,
          value,
        },
        success: {
          type: CONSTANT.FILTER_TREND_LIST.SUCCESS,
          value,
          response,
        },
        failure: {
          type: CONSTANT.FILTER_TREND_LIST.FAILURE,
          value,
          error,
        },
      };

      expect(updateFilterTrend.list.request(value)).to.eql(expected.request);
      expect(updateFilterTrend.list.success(value, response)).to.eql(expected.success);
      expect(updateFilterTrend.list.failure(value, error)).to.eql(expected.failure);
    });
  });

  describe('updateFilters()', () => {
    let totalPages;
    let totalResults;
    let error;
    beforeEach(() => {
      totalPages = 5;
      totalResults = 25;
      error = 'error';
    });

    it('Should call actions from updateFilters - requested, succeed, failed', () => {
      const expected = {
        request: {
          type: CONSTANT.UPDATE_FILTERS.REQUEST,
        },
        success: {
          type: CONSTANT.UPDATE_FILTERS.SUCCESS,
          totalPages,
          totalResults,
        },
        failure: {
          type: CONSTANT.UPDATE_FILTERS.FAILURE,
          error,
        },
      };

      expect(updateFilters.request()).to.eql(expected.request);
      expect(updateFilters.success(totalPages, totalResults)).to.eql(expected.success);
      expect(updateFilters.failure(error)).to.eql(expected.failure);
    });
  });

  describe('cacheRandomizedPage()', () => {
    let page;
    let error;
    beforeEach(() => {
      error = 'error';
    });

    it('Should call actions from cacheRandomizedPage - requested, succeed, failed', () => {
      const expected = {
        request: {
          type: CONSTANT.CACHE_RANDOMIZED_PAGE.REQUEST,
          page,
        },
        success: {
          type: CONSTANT.CACHE_RANDOMIZED_PAGE.SUCCESS,
        },
        failure: {
          type: CONSTANT.CACHE_RANDOMIZED_PAGE.FAILURE,
          error,
        },
      };

      expect(cacheRandomizedPage.request(page)).to.eql(expected.request);
      expect(cacheRandomizedPage.success()).to.eql(expected.success);
      expect(cacheRandomizedPage.failure(error)).to.eql(expected.failure);
    });
  });
});
