import Input from '../index';

import { expect } from 'chai';
import { mount } from 'enzyme';
import React from 'react';
import sinon from 'sinon';

describe('<Input />', () => {
  let renderComponent;
  const props = {
    title: 'test',
    type: 'password',
    placeholder: 'test',
    value: '',
    onChange: sinon.spy(),
  };
  beforeEach(() => {
    renderComponent = mount(<Input {...props} />, {});
  });

  it('Should render the the props.title', () => {
    const title = renderComponent.find('h6');
    expect(title.text()).to.eql(props.title);
  });
  it('Should handle "placeholder" and "type" attrs with data provided by props', () => {
    const input = renderComponent.find('input');
    expect(input).to.have.attr('placeholder', props.placeholder);
    expect(input).to.have.attr('type', props.type);
  });
  it('Should handle onChange event', () => {
    const input = renderComponent.find('input');
    input.simulate('change', { target: { value: 'new value' } });
    expect(input.debug()).to.eql(true);
  });
});
