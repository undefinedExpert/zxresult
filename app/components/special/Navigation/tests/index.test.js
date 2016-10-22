/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Navigation from '../index';


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
    it('Should contain login link', () => {
      const expected = renderedComponent.find('#loginButton');
      expect(expected).to.not.eql(undefined);
    });

    it('Should contain register link exist', () => {
      const expected = renderedComponent.find('#registerButton');
      expect(expected).to.not.eql(undefined);
    });
  });
});
