/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';

import Button from '../index';


describe('<Button />', () => {
  let renderComponent;
  const props = {
    type: 'submit',
    isLoading: true,
    children: <div id="test"></div>,
    onClick: sinon.spy(),
    handleRoute: () => {},
  };
  beforeEach(() => {
    renderComponent = shallow(<Button {...props} />, {});
  });

  it('Should return a button', () => {
    const expected = renderComponent.find('button');
    expect(expected).to.have.length(1);
  });

  it('Should contain children prop', () => {
    expect(renderComponent.children()).to.have.length(1);
  });

  it('Should handle the click event', () => {
    const button = renderComponent.find('button');
    button.simulate('click');
    expect(props.onClick.calledOnce).to.eql(true);
  });
});
