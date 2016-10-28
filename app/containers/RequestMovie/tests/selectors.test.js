/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import { expect } from 'chai';
import { fromJS } from 'immutable';

import { resultDomain, selectResult } from '../selectors';


describe('Result', () => {
  it('resultDomain()', () => {
    const resultSelector = resultDomain();
    const resultState = {
      data: {},
    };
    const mockedState = fromJS({
      result: fromJS(resultState),
    });

    expect(resultSelector(mockedState)).to.eql(resultState);
  });

  it('selectResult()', () => {
    const resultSelector = selectResult();
    const resultState = {
      active: {},
      pending: {},
      visited: {},
      notSorted: {},
      isFetching: {},
      noMoreResults: {},
    };
    const mockedState = fromJS({
      result: fromJS(resultState),
    });

    expect(resultSelector(mockedState)).to.eql(resultState);
  });
});
