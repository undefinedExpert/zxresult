import { fromJS } from 'immutable';
import expect from 'expect';

import { selectLocationState } from 'containers/App/selectors';

describe('selectLocationState', () => {
  it('should select route as a plain JS object', () => {
    const route = fromJS({
      locationBeforeTransitions: null
    });
    const mockedState = fromJS({
      route,3
    });
    expect(selectLocationState()(mockedState)).toEqual(route.toJS());
  });
});
