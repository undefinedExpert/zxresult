import WelcomeText from '../index';

import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';

describe('<WelcomeText />', () => {
  let renderComponent;
  beforeEach(() => {
    renderComponent = shallow(<WelcomeText />);
  });
  it('Should contains h1 element', () => {
    const h1 = renderComponent.find('h1');
    expect(h1).to.equal(true);
  });

  it('Should contains h1 element', () => {
    const h3 = renderComponent.find('h3');
    expect(h3).to.equal(true);
  });
});
