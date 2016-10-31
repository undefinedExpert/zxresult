/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import { expect } from 'chai';
import { select, call } from 'redux-saga/effects';

import { selectFilters } from 'containers/FilterForm/selectors';
import { selectResult } from 'containers/RequestMovie/selectors';

import { rankMovies } from '../analyseMovie';
import { processMovieAnalyse } from '../index';


describe('processMovieAnalyse', () => {
  const generator = processMovieAnalyse();
  it('should select selectResult()', () => {
    const task = generator.next().value;
    const operation = select(selectResult());
    expect(task).expectEqual(operation);
  });

  it('should selectFilters()', () => {
    const task = generator.next({ notSorted: [], pending: null }).value;
    const operation = select(selectFilters());
    expect(task).expectEqual(operation);
  });

  it('should call function rankMovies', () => {
    const task = generator.next({ range: {} }).value;
    const operation = call(rankMovies, [], null, {});
    expect(task).to.be.eql(operation);
  });

  it('Should return sortedMovies', () => {
    const task = generator.next([]).value;
    expect(task).to.be.eql([]);
  });
});
