import { fromJS } from 'immutable';
import { expect } from 'chai';

import {
  selectLocationState,
  globalDomain,
  filtersDomain,
} from 'containers/App/selectors';

describe('selectLocationState', () => {
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


describe('selectGlobalState', () => {
  const globalSelector = globalDomain();
  it('Should select global', () => {
    const globalState = fromJS({
      data: {},
    });
    const mockedState = fromJS({
      global: globalState,
    });
    expect(globalSelector(mockedState)).to.eql(globalState);
  });
});

describe('filtersDomain', () => {
  const filterSelector = filtersDomain();
  it('Should select filters', () => {
    const filterState = {
      data: {},
    };
    const mockedState = fromJS({
      global: fromJS({
        filters: fromJS(filterState),
      }),
    });
    expect(filterSelector(mockedState)).to.eql(filterState);
  });
});
