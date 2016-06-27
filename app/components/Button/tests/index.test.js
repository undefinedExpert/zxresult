import Button from '../index';

import { expect } from 'chai';
import { shallow, render, mount } from 'enzyme';
import React from 'react';

describe('<Button />', () => {
  it('Should return a button', () => {
    const renderComponent = shallow(<Button />);
    expect(renderComponent).to.exist;
  });
});
