/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import Genres from '../index';


describe('<Genres />', () => {
  let renderComponent;
  beforeEach(() => {
    renderComponent = mount(<Genres />, {});
  });

  it('Should contain 3 GenreIcons components', () => {
    const expected = renderComponent.find('img');
    expect(expected).to.have.length(3);
  });
});
