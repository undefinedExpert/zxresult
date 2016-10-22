/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import MovieDescription from '../index';


describe('<MovieDescription />', () => {
  let renderComponent;
  const props = {
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque laudantium minus recusandae sapiente temporibus ut vero. Hic nihil perferendis quasi qui suscipit voluptates. Culpa, sed, suscipit. Cumque ea fuga laborum?',
    limit: 30,
  };
  beforeEach(() => {
    renderComponent = shallow(<MovieDescription {...props} />, {});
  });

  it('Should trim the text with the length of props.limit', () => {
    const expected = renderComponent.find('p').text();
    expect(expected).to.have.length(props.limit);
  });

  it('Should contain error msh when "No overview found." message appears', () => {
    const errorMsgReturnedByApi = 'No overview found.';
    const errMsg = 'Description isn\'t available';
    renderComponent = shallow(<MovieDescription description={errorMsgReturnedByApi} />, {});

    const expected = renderComponent.find('p').text();
    expect(expected).to.eql(errMsg);
  });

  it('Should reveal the content when description is clicked', () => {
    // TODO: make this working
  });
});
