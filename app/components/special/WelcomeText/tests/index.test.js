/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import WelcomeText from '../index';


describe('<WelcomeText />', () => {
  let renderComponent;
  beforeEach(() => {
    renderComponent = shallow(<WelcomeText />);
  });

  it('Should contains h1 element', () => {
    const expected = renderComponent.find('h1');
    expect(expected).to.not.eql(undefined);
  });

  it('Should contains h3 element', () => {
    const expected = renderComponent.find('h3');
    expect(expected).to.not.eql(undefined);
  });
});
