import Section from '../index';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';
import Title from 'components/Title';

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
    const title = renderComponent.contains(<Title text={props.title} theme="light" />);
    expect(title).to.eql(true);
  });

  it('Should contain & render children prop', () => {
    expect(renderComponent.find('#test')).to.have.length(1);
  });
});
