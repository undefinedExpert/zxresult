import { MovieSearchForm } from '../index';
// import FilterSelect from 'components/FilterSelect';
import Button from 'components/Button';

import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';


describe('<MovieSearchForm />', () => {
  let renderComponent;
  beforeEach(() => {
    renderComponent = shallow(<MovieSearchForm />);
  });

  it('Should contain Form Element', () => {
    const expected = renderComponent.contains('form');
    expect(expected).to.not.eql(undefined);
  });

  it('Should contain mood form selector', () => {
    const expected = renderComponent.contains('#moodFormSelector');
    expect(expected).to.not.eql(undefined);
  });

  it('Should contain trend form selector', () => {
    const expected = renderComponent.contains('#moodFormSelector');
    expect(expected).to.not.eql(undefined);
  });

  it('Should contain submit button', () => {
    const expected = renderComponent.contains(<Button type="submit">Search</Button>);
    expect(expected).to.not.eql(undefined);
  });
});

