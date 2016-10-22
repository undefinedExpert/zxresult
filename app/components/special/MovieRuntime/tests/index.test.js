/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import MovieRuntime from '../index';


describe('<MovieRuntime />', () => {
  let renderComponent;
  beforeEach(() => {
    renderComponent = shallow(<MovieRuntime />, {});
  });

  it('Should render runtime', () => {
    const expected = renderComponent.find('span');
    expect(expected).to.have.length(1);
  });
});
