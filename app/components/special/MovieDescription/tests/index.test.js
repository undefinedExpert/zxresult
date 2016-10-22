/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import { expect } from 'chai';
import { shallow, render, mount } from 'enzyme';
import React from 'react';

import MovieDescription from '../index';

describe('<MovieDescription />', () => {
  let renderComponent;
  const props = {
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque laudantium minus recusandae sapiente temporibus ut vero. Hic nihil perferendis quasi qui suscipit voluptates. Culpa, sed, suscipit. Cumque ea fuga laborum?',
    limit: 30,
  };
  beforeEach(() => {
    renderComponent = mount(<MovieDescription {...props} />, {});
  });

  it('Should trim the text with the length of props.limit', () => {
    const expected = renderComponent.find('p')
    expect(expected.debug()).to.eql(false);
  });
  
  it('Should contain error msh when "No overview found." message appears', () => {
  
  });

  it('Should reveal the content when description is clicked', () => {

  });


});
