/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import { expect } from 'chai';
import { mount } from 'enzyme';
import React from 'react';
import sinon from 'sinon';

import Title from 'components/general/Title';

import Input from '../index';


describe('<Input />', () => {
  let renderComponent;
  const props = {
    title: 'test',
    type: 'password',
    placeholder: 'test',
    onChange: sinon.spy(),
  };
  beforeEach(() => {
    renderComponent = mount(<Input {...props} />, {});
  });

  it('Should render the props.title', () => {
    const title = renderComponent.contains(<Title text={props.title} />);
    expect(title).to.eql(true);
  });

  it('Should handle "placeholder" and "type" attrs with data provided by props', () => {
    const input = renderComponent.find('input');
    expect(input).to.have.attr('placeholder', props.placeholder);
    expect(input).to.have.attr('type', props.type);
  });

  it('Should handle onChange event', () => {
    const input = renderComponent.find('input').first();
    input.simulate('change');
    expect(props.onChange.calledOnce).to.eql(true);
  });
});
