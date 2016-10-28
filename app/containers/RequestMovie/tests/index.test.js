/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';

import configureStore from '../../../store';

import { RequestMovie } from '../index';

describe('<RequestMovie />', () => {
  let renderComponent;
  let store;
  const props = {
    active: fromJS(null),
    notSorted: fromJS([]), // Freshly downloaded, before moved to pending need to be analysed.
    pending: fromJS([]),
    cache: fromJS([]),
    noMoreResults: false,
    isFetching: false,
  };
  beforeEach(() => {
    store = configureStore({}, browserHistory);
    renderComponent = shallow(
      <Provider store={store}>
        <RequestMovie {...props} />
      </Provider>
    ).shallow();
  });

  it('Should contain SelectList Component', () => {
    expect(renderComponent.debug()).to.have.length(1);
  });
});
