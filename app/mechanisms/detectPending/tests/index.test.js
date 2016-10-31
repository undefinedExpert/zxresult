/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import { expect } from 'chai';
import { range } from 'lodash';
import { select, call } from 'redux-saga/effects';

import { selectFilters } from 'containers/FilterForm/selectors';
import { selectResult } from 'containers/RequestMovie/selectors';

import { detectPending, detector } from '../index';

describe('selectFromStore', () => {

});

describe('detectPending', () => {
  describe('detectPending()', () => {
    const generator = detectPending();

    it('Should select selectResult()', () => {
      const task = generator.next().value;
      const operation = select(selectResult());
      expect(task).expectEqual(operation);
    });

    it('Should select selectFilters()', () => {
      const task = generator.next({ pending: {} }).value;
      const operation = select(selectFilters());
      expect(task).expectEqual(operation);
    });

    it('we should download a page when pagesCache == null', () => {
      const task = generator.next({ range: {} }).value;
      const operation = call(detector, { range: {}, pending: {} });
      expect(task).to.be.eql(operation);

      generator.next();
    });
  });

  describe('detector', () => {
    const fn = detector;
    // false - download page // true - push pending // null - no more results

    it('we should download a page when pagesCache == null', () => {
      const fixture = {
        range: {
          pagesCache: null,
        },
      };
      const status = fn(fixture);
      expect(status).to.be.eql(false);
    });

    it('should return false (not detected) when we have no page to download, and we don\' have enough pending items', () => {
      const fixture = {
        pending: range(0, 29),
        range: {
          pagesCache: [1, 2, 3, 4, 5],
        },
      };
      const status = fn(fixture);
      expect(status).to.be.eql(false);
    });

    it('should return true if we still got pending items', () => {
      const fixture = {
        pending: range(0, 29),
        range: {
          pagesCache: [],
        },
      };
      const status = fn(fixture);
      expect(status).to.be.eql(true);
    });

    it('should return null if we got no more results to display', () => {
      const fixture = {
        pending: [],
        range: {
          pagesCache: [],
        },
      };
      const status = fn(fixture);
      expect(status).to.be.eql(null);
    });
  });
});
