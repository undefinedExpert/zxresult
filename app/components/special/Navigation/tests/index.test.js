import Navigation from '../index';

import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';

describe('<Navigation />', () => {
  let renderedComponent;
  beforeEach(() => {
    renderedComponent = shallow(<Navigation />);
  });
  describe('bar__left', () => {
    it('Should contain logotype element', () => {
      const expected = renderedComponent.find('#logotype');
      expect(expected).to.not.eql(undefined);
    });
  });

  describe('bar__right', () => {
    it('Login link exist', () => {
      const expected = renderedComponent.find('#loginButton');
      expect(expected).to.not.eql(undefined);
    });

    it('Register link exist', () => {
      const expected = renderedComponent.find('#registerButton');
      expect(expected).to.not.eql(undefined);
    });
  });
});
