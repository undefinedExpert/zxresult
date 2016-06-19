import Navigation from '../index';

import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';

describe('<Navigation />', () => {

  describe('bar__left', () => {

    //TODO: do all tests when needed
    it('Logotype element exist', () => {
      const renderedComponent = shallow(<Navigation />);
      expect(renderedComponent.find('#logotype').length).toEqual(1);
    });
  });

  describe('bar__right', () => {

      it('Login link exist', () => {
        const renderedComponent = shallow(<Navigation />);
        expect(renderedComponent.find('#loginButton').length).toEqual(1);
      });

      it('Register link exist', () => {
        const renderedComponent = shallow(<Navigation />);
        expect(renderedComponent.find('#registerButton').length).toEqual(1);
      });

    });
    
});
