/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import { expect } from 'chai';
import { fromJS } from 'immutable';

import { filtersDomain, selectFilters } from './../selectors';


describe('Filters', () => {
  it('filtersDomain()', () => {
    const filterSelector = filtersDomain();
    const filterState = {
      data: {},
    };
    const mockedState = fromJS({
      filters: fromJS(filterState),
    });

    expect(filterSelector(mockedState)).to.eql(filterState);
  });

  it('selectFilters()', () => {
    const filterSelector = selectFilters();
    const filterState = {
      keyword: {},
      genre: {},
      trend: {},
      range: {},
      decade: {},
    };
    const mockedState = fromJS({
      filters: fromJS(filterState),
    });

    expect(filterSelector(mockedState)).to.eql(filterState);
  });
});
