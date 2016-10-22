/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';

import GenreIcons from '../index';


describe('<GenreIcons />', () => {
  let renderComponent;
  const props = {
    type: 'Horror',
  };
  beforeEach(() => {
    renderComponent = shallow(<GenreIcons {...props} />, {});
  });

  it('Should render icon with appropriate type', () => {
    const expected = renderComponent.find('img');
    expect(expected).to.have.attr('alt', 'Horror icon');
  });
});
