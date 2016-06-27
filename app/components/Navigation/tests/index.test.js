import Navigation from '../index';

import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';

describe('<Navigation />', () => {
  describe('bar__left', () => {
    it('Should contain logotype element', () => {
      const renderedComponent = shallow(<Navigation />);
      const logotype = renderedComponent.find('#logotype');
      expect(logotype).to.exist;
    });
  });

  describe('bar__right', () => {
    it('Login link exist', () => {
      const renderedComponent = shallow(<Navigation />);
      const button = renderedComponent.find('#loginButton');
      expect(button).to.exist;
    });

    it('Register link exist', () => {
      const renderedComponent = shallow(<Navigation />);
      expect(renderedComponent.find('#registerButton')).to.exist;
    });
  });
});
