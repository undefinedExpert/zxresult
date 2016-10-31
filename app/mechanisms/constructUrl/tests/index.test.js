/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import { expect } from 'chai';
import { select, call } from 'redux-saga/effects';

import { selectFilters } from 'containers/FilterForm/selectors';

import constructUrl from '../index';
import randomizePage from '../randomizePage';
import { buildUrl } from '../buildUrl';
import { buildParams } from '../extractParams';


describe('constructUrl', () => {
  const endpoint = '/eslotwinski/movie';
  const generator = constructUrl(endpoint);

  it('should select filters', () => {
    const task = generator.next().value;
    const operation = select(selectFilters());
    expect(task).expectEqual(operation);
  });

  it('should not call randomizePage function', () => {
    const localGenerator = constructUrl(endpoint, {}, false);
    localGenerator.next();

    const task = localGenerator.next({}).value;
    const operation = call(buildParams, {}, {}, false, undefined);

    expect(task).to.be.eql(operation);
  });

  it('should call randomizePage function', () => {
    const filters = {};
    const task = generator.next(filters).value;
    const operation = call(randomizePage, filters);
    expect(task).to.eql(operation);
  });

  it('should call buildParams function', () => {
    const page = 50;
    const task = generator.next(page).value;
    const operation = call(buildParams, {}, {}, true, page);
    expect(task).to.be.eql(operation);
  });

  it('should call buildUrl function', () => {
    const params = {};
    const task = generator.next(params).value;
    const operation = call(buildUrl, {}, endpoint);
    expect(task).to.be.eql(operation);
  });

  it('should provide url, which might be use in xhr request', () => {
    const url = 'http://eslotwinski.com/';
    const task = generator.next(url).value;
    expect(task).to.be.eql(url);
  });
});
