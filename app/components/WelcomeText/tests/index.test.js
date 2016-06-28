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
    const expected = renderComponent.find('h1');
    expect(expected).to.not.eql(undefined);
  });

  it('Should contains h1 element', () => {
    const expected = renderComponent.find('h3');
    expect(expected).to.not.eql(undefined);
  });
});
