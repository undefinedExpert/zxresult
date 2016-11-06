/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import MovieGenres from '../index';


describe('<MovieGenres />', () => {
  let renderComponent;
  beforeEach(() => {
    renderComponent = mount(<MovieGenres items={['animation']} />, {});
  });

  it('Should contain 3 GenreIcons components', () => {
    const expected = renderComponent.find('img');
    expect(expected).to.have.length(1);
  });
});
