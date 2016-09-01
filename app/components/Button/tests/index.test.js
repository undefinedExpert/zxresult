import Button from '../index';

import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';

describe('<Button />', () => {
  let renderComponent;
  const props = {
    type: 'submit',
    isLoading: true,
    children: [],
    onClick: sinon.spy(),
    handleRoute: () => {},
  };
  beforeEach(() => {
    renderComponent = shallow(<Button {...props} />, {});
  });
  it('Should return a button', () => {
    expect(renderComponent).to.not.eql(undefined);
  });

  it('Should contain children prop', () => {
    expect(renderComponent).to.not.eql(undefined);
  });

  it('Should handle the click event', () => {
    const button = renderComponent.find('button');
    button.simulate('click');
    expect(props.onClick.calledOnce).to.eql(true);
  });
});
