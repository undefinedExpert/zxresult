import WelcomeText from '../index';

import { expect } from 'chai';
import { shallow, render, mount } from 'enzyme';
import React from 'react';

describe('<WelcomeText />', () => {
  it('Should contains h1 element', () => {
    const renderComponent = shallow(<WelcomeText />);
    const h1 = renderComponent.find('h1');
    expect(h1).to.exist;
  });

  it('Should contains h1 element', () => {
    const renderComponent = shallow(<WelcomeText />);
    const h3 = renderComponent.find('h3');
    expect(h3).to.exist;
  });
});
