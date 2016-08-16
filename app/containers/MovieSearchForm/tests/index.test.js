import { MovieSearchForm } from '../index';
import SelectList from 'components/SelectList';

import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';

describe('<Movie-search-form />', () => {
  let renderComponent;
  const props = {
    filters: {
      genre: 'test',
    },
  };
  beforeEach(() => {
    renderComponent = shallow(<MovieSearchForm {...props} />, {});
  });

  it('It should contain SelectList Component', () => {
    const excepted = renderComponent.containsMatchingElement(<SelectList />);
    expect(excepted).to.eql(true);
  });

  // It should render decade, sentence, type select inputs
  // It should render search button
});

