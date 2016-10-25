/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import { expect } from 'chai';
import { fromJS } from 'immutable';

import { selectLocationState } from './../selectors';


describe('Location', () => {
  it('should select route as a plain JS object', () => {
    const route = fromJS({
      locationBeforeTransitions: null,
    });
    const mockedState = fromJS({
      route,
    });

    expect(selectLocationState()(mockedState)).to.eql(route.toJS());
  });
});
