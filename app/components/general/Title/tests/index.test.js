/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';

import Title from '../index';

describe('<Title />', () => {
  let renderComponent;
  const props = {
    title: 'some title',
    text: 'text',
  };
  beforeEach(() => {
    renderComponent = shallow(<Title {...props} />, {});
  });

  it('should contain h4 element', () => {
    const expected = renderComponent.find('h4');
    expect(expected).to.be.length(1);
  });

  it('should render children when there is no text provided', () => {
    const fixture = 'test';
    renderComponent = shallow(<Title>{fixture}</Title>);
    const excepted = renderComponent.find('h4').text(fixture);
    expect(excepted).to.eql(fixture);
  });
});
