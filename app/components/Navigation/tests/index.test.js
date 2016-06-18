import Navigation from '../index';

import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';

describe('<Navigation />', () => {

  describe('bar__left', () => {

    it('Logotype element exist', () => {
      const renderedComponent = shallow(<Navigation />);
      expect(renderedComponent.find('#logotype').length).toEqual(1);
    });

  });

  describe('bar__right', () => {

      it('Login link exist', () => {
        const renderedComponent = shallow(<Navigation />);
        expect(renderedComponent.find('.right__item--login').length).toEqual(1);
      });

      it('register link exist', () => {
        const renderedComponent = shallow(<Navigation />);
        expect(renderedComponent.find('.right__item--register').length).toEqual(1);
      });

    });
    
});
