/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import { expect } from 'chai';
import { put } from 'redux-saga/effects';
import { range as numRange } from 'lodash';

import { cacheRandomizedPage } from 'containers/FilterForm/actions';

import randomizePage, { pickRandom } from '../randomizePage';


describe('randomizePage', () => {
  describe('pickRandom()', () => {
    const fn = pickRandom;
    const fixtureCollectionSize = 100;
    const cache = null;

    it('should return null when whatLeft exist, but it\'s size is == 0', () => {
      const result = fn(fixtureCollectionSize, []);
      expect(result).to.be.eql(null);
    });

    it('Should define collection size when it is undefined', () => {
      fn(fixtureCollectionSize, cache);

      const expected = fn.oldCollectionSize;
      expect(expected).to.be.eql(fixtureCollectionSize);
    });

    it('should preFill Array with 1-999 numbers', () => {
      // FIXME: Randomly runned single errors
      const result = numRange(1, 1000);
      fn(fixtureCollectionSize, cache);

      const expected = fn.preFilled;
      expect(expected.toJS()).to.be.eql(result);
    });

    it('should limit the collection size to 999 length, when collection size > 1000', () => {
      fn(fixtureCollectionSize, cache);
      expect(fn.oldCollectionSize).to.be.eql(fixtureCollectionSize);

      fn(1500, cache);
      expect(fn.preFilled.size).to.be.eql(999);
    });

    it('should update oldCollection size when change occur', () => {
      // initializing collection size and cache
      const initialRun = fn(fixtureCollectionSize, cache);
      const initialCollectionSize = fn.oldCollectionSize;
      expect(fn.oldCollectionSize).to.be.eql(fixtureCollectionSize);

      // run the same function with old values, and just pick another value from cache
      const secondRun = fn(initialCollectionSize, initialRun.cache);
      const secondRunCollectionSize = fn.oldCollectionSize;
      expect(secondRunCollectionSize).to.not.be.eql(initialCollectionSize - 1);
      expect(initialRun.cache.size).to.not.be.eql(secondRun.cache.size);

      // Here we create new collection size and reset our cache,
      // the func should generate new cache basing on our new collection size
      fn(50, null);
      const thirdRunCollection = fn.oldCollectionSize;
      expect(thirdRunCollection).to.be.eql(50);
    });

    it('should fill cache with random numbers', () => {
      const result = fn(fixtureCollectionSize, cache);

      const range = fn.preFilled.setSize(fixtureCollectionSize);
      const indexOfRemoved = range.indexOf(result.number);
      const rangeMinusRandom = range.remove(indexOfRemoved);

      const expected = result.cache.toJS();
      expect(expected).to.not.be.eql(rangeMinusRandom.toJS());
    });

    it('should return random number and cache without that number', () => {
      const result = fn(35, null);

      const isExist = result.cache.indexOf(result.number);
      expect(isExist).to.be.eql(-1);

      expect(result.cache.size).to.be.eql(34);
    });

    it('should return random number from collection', () => {
      const result = fn(fixtureCollectionSize, cache);
      expect(result.number).to.not.be.eql(undefined);
    });
  });

  describe('randomizePage()', () => {
    const range = {
      pagesCache: null,
      pages: 5,
    };


    it('should return null when picked === null', () => {
      const localGenerator = randomizePage({ range });
      localGenerator.next();

      const task = localGenerator.next(null).value;
      expect(task).to.be.eql(null);
    });

    it('should push picked.cache into store using cacheRandomizedPage action', () => {
      const generator = randomizePage({ range });
      generator.next();

      const picked = { number: 5, cache: [1, 2, 3, 4] };
      const task = generator.next(picked).value;
      const operation = put(cacheRandomizedPage.request(picked.cache));
      expect(task).to.be.eql(operation);
    });
  });
});
