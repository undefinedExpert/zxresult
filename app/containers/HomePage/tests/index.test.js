import { HomePage } from '../index';
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

  it('Should render Movie-search-form', () => {
    const excepted = renderedComponent.contains(<MovieSearchForm />);
    expect(excepted).to.eql(true);
  });

  it('Should render WelcomeText', () => {
    const excepted = renderedComponent.contains(<WelcomeText />);
    expect(excepted).to.eql(true);
  });
});
