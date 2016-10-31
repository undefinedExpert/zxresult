/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import { expect } from 'chai';

import { apiUrl, apiKey } from 'containers/App/constants';

import { buildUrl, pairParams, pairValueAndRef } from '../buildUrl';


describe('buildUrl', () => {
  describe('pairValueAndRef', () => {
    const fn = pairValueAndRef;

    it('should handle object type of filter', () => {
      const fixture = {
        ref: {
          id: 'with_genres',
        },
        value: {
          id: 16,
        },
      };
      const result = [{ with_genres: 16 }];

      const expected = fn(fixture);
      expect(expected).to.be.eql(result);
    });

    it('should handle number type of filter', () => {
      const fixtureValue = 1000;
      const fixtureRef = 'page';
      const result = [{ page: 1000 }];

      const expected = fn(fixtureValue, fixtureRef);
      expect(expected).to.be.eql(result);
    });
  });

  describe('pairValueAndRef', () => {
    const fn = pairParams;
    const result = [
      {
        page: 1000,
      },
      {
        with_genres: 16,
      },
    ];
    const fixtureFilters = {
      page: 1000,
      genre: {
        ref: {
          id: 'with_genres',
        },
        value: {
          id: 16,
        },
      },
    };

    it('should return Array of paired params', () => {
      const expected = fn(fixtureFilters);
      expect(expected).to.be.eql(result);
    });
  });

  describe('buildUrl', () => {
    const fn = buildUrl;
    const endpoint = '/eslotwinski/movie';

    it('should return url with params if they are set', () => {
      const query = '&page=1000&with_genres=16';
      const baseUrl = `${apiUrl}${endpoint}?${apiKey}${query}`;
      const fixtureFilters = {
        page: 1000,
        genre: {
          ref: {
            id: 'with_genres',
          },
          value: {
            id: 16,
          },
        },
      };

      const expected = fn(fixtureFilters, endpoint);
      expect(expected).to.be.eql(baseUrl);
    });

    it('should return url without query', () => {
      const baseUrl = `${apiUrl}${endpoint}?${apiKey}`;
      const fixtureFilters = {};

      const expected = fn(fixtureFilters, endpoint);
      expect(expected).to.be.eql(baseUrl);
    });
  });
});
