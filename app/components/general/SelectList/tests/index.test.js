/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';

import SelectList from '../index';


describe('<SelectList />', () => {
  let renderComponent;
  const props = {
    items: [
      { value: 'test1', options: [], settings: { title: 'Test1' } },
      { value: 'test2', options: [], settings: { title: 'Test2' } },
      { value: 'test3', options: [], settings: { title: 'Test3' } },
    ],
  };
  beforeEach(() => {
    renderComponent = shallow(<SelectList items={props.items} />, {});
  });

  it('Should render at least 3 items', () => {
    const expected = renderComponent.find('Select');
    expect(expected.length).to.be.eql(props.items.length);
  });
});
