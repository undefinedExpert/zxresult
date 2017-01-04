/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import MovieResultImage from '../index';


// TODO: Write a test which will cover image loading
describe('<MovieResultImage />', () => {
  let renderComponent;
  const props = {
    path: '/s1EBTUtrX4tKuawlapyDLig3sF9.jpg',
    alt: 'test',
  };
  beforeEach(() => {
    renderComponent = mount(<MovieResultImage {...props} />, {});
  });

  it('Should render image with appropriate src', () => {
    const expected = renderComponent.find('img');
    expect(expected).to.have.length(1);
  });
});
