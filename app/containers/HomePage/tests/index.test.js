import { HomePage } from '../index';
import Navigation from 'components/Navigation';
import MovieSearchForm from 'containers/MovieSearchForm';
import WelcomeText from 'components/WelcomeText';

import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';

describe('<HomePage />', () => {
  let renderedComponent;
  beforeEach(() => {
    renderedComponent = shallow(<HomePage />);
  });

  it('Should render Navigation component', () => {
    const excepted = renderedComponent.containsMatchingElement(<Navigation />);
    expect(excepted).to.eql(true);
  });

  it('Should render MovieSearchForm', () => {
    const excepted = renderedComponent.containsMatchingElement(<MovieSearchForm />);
    expect(excepted).to.eql(true);
  });

  it('Should render WelcomeText', () => {
    const excepted = renderedComponent.containsMatchingElement(<WelcomeText />);
    expect(excepted).to.eql(true);
  });
});
