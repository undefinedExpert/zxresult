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
import LoadingIndicator from 'components/general/LoadingIndicator';

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

  it('Should render LoadingIndicator component', () => {
    const modifiedComponent = renderComponent.setProps({ isFetching: true });
    const expected = modifiedComponent.contains(<LoadingIndicator isDisabled={5 === 0} />);
    expect(expected).to.eql(true);
  });

  it('Should render "Search" message', () => {
    const modifiedComponent = renderComponent.setProps({ range: 5, noMoreResults: false });
    const expected = modifiedComponent.contains('Search');
    expect(expected).to.eql(true);
  });

  it('Should render "End of results" message', () => {
    const modifiedComponent = renderComponent.setProps({ noMoreResults: true });
    const expected = modifiedComponent.contains('End of results');
    expect(expected).to.eql(true);
  });

  it('Should render "Filters are too specific" message', () => {
    const modifiedComponent = renderComponent.setProps({ range: 0 });
    const expected = modifiedComponent.contains('Filters are too specific');
    expect(expected).to.eql(true);
  });
});
