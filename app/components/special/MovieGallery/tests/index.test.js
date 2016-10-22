/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';

import MovieGallery from '../index';


// TODO: We should mount Gallery component instead of shallow
describe('<MovieGallery />', () => {
  let renderComponent;
  const props = {
    path: '/s1EBTUtrX4tKuawlapyDLig3sF9.jpg',
    alt: 'test',
    orientation: 'horizontal',
  };
  beforeEach(() => {
    renderComponent = shallow(<MovieGallery {...props} />, {});
  });

  it('Should contain Section', () => {
    const expected = renderComponent.find('Section').text();
    expect(expected).to.eql('<Section />');
  });
});
