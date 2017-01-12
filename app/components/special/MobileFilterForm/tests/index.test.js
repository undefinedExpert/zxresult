/**
*  Components are imported in specific (scope based) order:
*  1. Node_modules
*  2. Application
*  3. Module
*/

import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import MobileFilterForm from '../index';


describe('<MobileFilterForm />', () => {
  let mockup;
  let height;
  beforeEach(() => {
    height = 500;
    mockup = shallow(
      <MobileFilterForm formHeight={500}>
        <div>child</div>
      </MobileFilterForm>
    );
  });

  it('It should calculate top margin update state, set it our div when component mount', () => {
    const component = mockup;
    expect(component.prop('style')).to.eql({ height });
  });

  it('It should update top margin when receive new prop', () => {
    const component = mockup;

    const newHeight = 800;
    component.setProps({ formHeight: newHeight });
    expect(component.prop('style')).to.eql({ height: newHeight });
  });
});
