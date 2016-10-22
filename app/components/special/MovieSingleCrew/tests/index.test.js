/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import MovieSingleCrew from '../index';


describe('<MovieSingleCrew />', () => {
  let renderComponent;
  beforeEach(() => {
    renderComponent = shallow(<MovieSingleCrew />, {});
  });

  it('Should render heading and subheading', () => {
    const heading = renderComponent.find('h4');
    expect(heading).to.have.length(1);

    const subheading = renderComponent.find('h5');
    expect(subheading).to.have.length(1);
  });
});
