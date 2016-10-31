/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import { expect } from 'chai';
import { range as numRange } from 'lodash';

import { rankItem, rankMovies } from '../analyseMovie';


describe('analyseMovie', () => {
  describe('rankItem', () => {
    const item = {
      vote_count: 100,
      vote_average: 5,
    };

    it('should return movie rank basing on it\'s information', () => {
      const result = 5.5;
      const expected = rankItem(item);
      expect(expected).to.be.eql(result);
    });
  });

  describe('rankMovies', () => {
    const fn = rankMovies;
    let notSorted;
    let pending;
    let range;
    beforeEach(() => {
      notSorted = [
        {
          vote_count: 325,
          vote_average: 6.7,
        },
        {
          vote_count: 14,
          vote_average: 7.9,
        },
        {
          vote_count: 59,
          vote_average: 7,
        },
        {
          vote_count: 39,
          vote_average: 4.9,
        },
        {
          vote_count: 321,
          vote_average: 6.69,
        },
        {
          vote_count: 53,
          vote_average: 8,
        },
        {
          vote_count: 64,
          vote_average: 7.6,
        },
        {
          vote_count: 39,
          vote_average: 6.6,
        },
        {
          vote_count: 66,
          vote_average: 6.5,
        },
        {
          vote_count: 76,
          vote_average: 5,
        },
        {
          vote_count: 67,
          vote_average: 7,
        },
        {
          vote_count: 1,
          vote_average: 8.5,
        },
        {
          vote_count: 2512,
          vote_average: 6.1,
        },
        {
          vote_count: 10256,
          vote_average: 6.7,
        },
      ];
      pending = [
        {
          vote_count: 716,
          vote_average: 6,
        },
        {
          vote_count: 431,
          vote_average: 5.9,
        },
      ];
      range = {
        pages: 9,
        pagesCache: numRange(1, 30),
      };
    });

    it('should concat notSorted with a pending, if pending exist', () => {
      const sorted = fn(notSorted, pending, range);
      const expected = sorted.length === (pending.length + notSorted.length);
      expect(expected).to.eql(true);
    });

    it('should not concat notSorted with pending', () => {
      const sorted = fn(notSorted, [], range);
      expect(sorted).to.have.length(notSorted.length);
    });


    it('should check if we got more then 10 pages left', () => {
      range.pages = 100;
      const notSortedLength = notSorted.length;

      const sorted = fn(notSorted, undefined, range);
      expect(sorted).to.have.length(notSortedLength - 10);
    });
  });
});
