/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';

import RequestMovie from 'containers/RequestMovie';
import configureStore from '../../../store';

import { FilterForm } from '../index';

// mapStateToProps - https://github.com/reactjs/redux/issues/1534
// TODO: Handle FilterForm methods
describe('<FilterForm />', () => {
  let renderComponent;
  let store;
  const props = {
    keyword: {
      active: {
        query: 'eslotwinski',
      },
      list: null,
      apiRef: {
        query: 'query',
        id: 'with_keywords',
      },
    },
    trend: {
      active: {
        name: 'Popular',
        voteAverageMin: null,
        voteAverageMax: null,
        voteCountMin: 300,
        voteCountMax: null,
      },
      list: [
        {
          name: 'Highly rated',
          voteAverageMin: 6.5,
          voteAverageMax: 10,
          voteCountMin: 70,
          voteCountMax: null,
        },
        {
          name: 'Popular',
          voteAverageMin: null,
          voteAverageMax: null,
          voteCountMin: 300,
          voteCountMax: null,
        },
      ],
    },
    decade: {
      active: {
        name: '1970s',
        dateMin: '1970-01-01',
        dateMax: '1979-01-01',
      },
      list: [
        {
          name: '1970s',
          dateMin: '1970-01-01',
          dateMax: '1979-01-01',
        },
        {
          name: '1960s',
          dateMin: '1960-01-01',
          dateMax: '1969-01-01',
        },
      ],
    },
    genre: {
      active: {
        id: 16,
        name: 'Animation',
      },
      list: [
        {
          id: 16,
          name: 'Animation',
        },
        {
          id: 18,
          name: 'Action',
        },
      ],
    },
    range: {
      results: 5,
      pagesCache: null,
      pages: 5,
    },
  };
  beforeEach(() => {
    store = configureStore({}, browserHistory);
    renderComponent = shallow(
      <Provider store={store}>
        <FilterForm {...props} />
      </Provider>
      ).shallow();
  });

  it('Should contain SelectList Component', () => {
    const expected = renderComponent.find('SelectList');
    expect(expected).to.have.length(1);
  });

  it('Should contain appropriate SelectList items: genre, decade, trend', () => {
    const expected = renderComponent.find('SelectList').prop('items');
    expect(expected).to.have.length(3);
  });

  it('Should contain RequestMovie', () => {
    const expected = renderComponent.contains(<RequestMovie range={props.range.results} />);
    expect(expected).to.eql(true);
  });
});
