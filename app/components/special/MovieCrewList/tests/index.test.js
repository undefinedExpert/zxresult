/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import { expect } from 'chai';
import { mount } from 'enzyme';
import React from 'react';

import MovieCrewList from '../index';


describe('<CrewList />', () => {
  let renderComponent;
  const props = {
    items: [
      { image: 'test', alt: 'test', title: 'Director', sectionSize: '1/3' },
      { image: 'test', alt: 'test', title: 'Cast', sectionSize: '1/3' },
      { image: 'test', alt: 'test', title: 'Cast', sectionSize: '1/3' },
    ],
  };
  beforeEach(() => {
    renderComponent = mount(<MovieCrewList {...props} />, {});
  });

  it('It should render all crewItems', () => {
    const expected = renderComponent.find('MovieSingleCrew');
    expect(expected).to.be.length(props.items.length);
  });
});
