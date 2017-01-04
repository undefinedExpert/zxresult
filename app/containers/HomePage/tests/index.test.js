import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import FilterForm from 'containers/FilterForm';
import WelcomeText from 'components/special/WelcomeText';

import HomePage from '../index';


describe('<HomePage />', () => {
  let renderedComponent;
  beforeEach(() => {
    renderedComponent = shallow(<HomePage />);
  });

  it('Should contain FilterForm', () => {
    const expected = renderedComponent.contains(<FilterForm />);
    expect(expected).to.eql(true);
  });

  it('Should render WelcomeText', () => {
    const expected = renderedComponent.contains(<WelcomeText />);
    expect(expected).to.eql(true);
  });
});
