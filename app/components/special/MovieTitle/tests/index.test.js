/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import MovieTitle from '../index';


describe('<MovieTitle />', () => {
  let renderComponent;
  beforeEach(() => {
    renderComponent = shallow(<MovieTitle />, {});
  });

  it('Should render movie title', () => {
    const expected = renderComponent.find('h1');
    expect(expected).to.have.length(1);
  });

  it('Should render date associated with movie title', () => {
    const expected = renderComponent.find('h1 > span');
    expect(expected).to.have.length(1);
  });
});
