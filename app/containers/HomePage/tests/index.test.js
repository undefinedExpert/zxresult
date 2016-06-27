import { HomePage } from '../index';
import Navigation from 'components/Navigation';

import { expect } from 'chai';
import { shallow, render, mount } from 'enzyme';
import React from 'react';

describe('<HomePage />', () => {
  it('should render Navigation component', () => {
    const renderedComponent = shallow(<HomePage />);
    expect(renderedComponent.contains(<Navigation />)).to.eql(true);
  });
});
