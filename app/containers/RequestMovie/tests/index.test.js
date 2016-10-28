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

  it('Should contain Button', () => {
    const expected = renderComponent.find('Button');
    expect(expected).to.have.length(1);
  });

  it('Should render "loading" message', () => {
    const modifiedComponent = renderComponent.setProps({ isFetching: true });
    const expected = modifiedComponent.contains(<h4>Loading...</h4>);
    expect(expected).to.eql(true);
  });

  it('Should render "no more results" message', () => {
    const modifiedComponent = renderComponent.setProps({ noMoreResults: true });
    const expected = modifiedComponent.contains(<h4>No more results</h4>);
    expect(expected).to.eql(true);
  });
});
