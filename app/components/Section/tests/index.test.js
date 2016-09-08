import Section from '../index';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';

describe('<Section />', () => {
  let renderComponent;
  const props = {
    title: 'test',
  };
  beforeEach(() => {
    const childElement = <div id="test"></div>;
    renderComponent = shallow(<Section {...props}>{childElement}</Section>, {});
  });

  it('Should render the props.title', () => {
    const title = renderComponent.find('h4');
    expect(title.text()).to.eql(props.title);
  });

  it('Should contain & render children prop', () => {
    expect(renderComponent.find('#test')).to.have.length(1);
  });
});
