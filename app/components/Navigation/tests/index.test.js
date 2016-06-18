import Navigation from '../index';

import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';

describe('<Navigation />', () => {

  describe('bar__left', () => {

    it('Logotype element exist', () => {


      const renderedComponent = shallow(<Navigation />);

      expect(renderedComponent.find('.left__item--logo').length).toEqual(1);


    });

  });

  describe('bar__right', () => {

      it('Login link exist', () => {
        const renderedComponent = shallow(<Navigation />);
        const link = (<a id="loginButton" href="#">Log In |</a>);
        const element = (
          <li className="right__item right__item--login">
            {link}
          </li>
        );

        expect(renderedComponent.contains(element)).toEqual(true);
      });

      it('register link exist', () => {
        const renderedComponent = shallow(<Navigation />);
        const link = (<a id="registerButton" href="#">Register</a>);
        const element = (
          <li className="right__item right__item--register">
            {link}
          </li>
        );

        expect(renderedComponent.contains(element)).toEqual(true);
      });

    });
    
});
