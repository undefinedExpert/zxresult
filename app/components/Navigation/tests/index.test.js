import Navigation from '../index';

import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';

describe('<Navigation />', () => {
    it('Contains login link', () => {
      const renderedComponent = shallow(<Navigation />);
      let link = (<a id="loginButton" href="#">Log In |</a>);
      expect(renderedComponent.contains(
        <li className="right__item right__item--login">
          {link}
        </li>
      )).toEqual(true);

    });
    
});
