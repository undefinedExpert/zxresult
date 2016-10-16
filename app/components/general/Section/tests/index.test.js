/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';

import Title from 'components/general/Title';

import Section from '../index';


describe('<Section />', () => {
  let renderComponent;
  const props = {
    title: 'test',
    children: [<div id="test"></div>],
  };
  beforeEach(() => {
    renderComponent = shallow(<Section {...props}>{props.children}</Section>, {});
  });

  it('Should render the props.title', () => {
    const title = renderComponent.contains(<Title text={props.title} theme="light" />);
    expect(title).to.eql(true);
  });

  it('Should contain & render children prop', () => {
    expect(renderComponent.find('#test')).to.have.length(1);
  });
});
