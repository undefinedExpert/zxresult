/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';

import MovieHeartRate, { renderMultipleHearts } from '../index';


describe('<MovieHeartRate />', () => {
  it('Should render multiple hearth both types', () => {
    const range = 5;
    const average = 5 / 2;
    const renderComponent = shallow(renderMultipleHearts(range, average));

    const filled = renderComponent.find('IoHeart[type="filled"]');
    expect(filled).to.have.length(3);

    const unfilled = renderComponent.find('IoHeart[type="unfilled"]');
    expect(unfilled).to.have.length(2);
  });

  it('Should render MovieHeartRate component with 5 hearths', () => {
    const props = {
      votes: {
        voteCount: 5,
        voteAverage: 7,
      },
    };
    const renderComponent = shallow(<MovieHeartRate {...props} />, {});

    const expected = renderComponent.find('IoHeart');
    expect(expected).to.have.length(5);
  });
});
