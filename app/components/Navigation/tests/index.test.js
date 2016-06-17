import Navigation from '../index';

import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';

describe('<Navigation />', () => {
    const children = (<h1>Test</h1>);

    it('Contains login link', () => {
      const renderedComponent = shallow(<A className="test" />);
        expect(renderedComponent.find('.right__item ight__item--login'))
        console.log()
    });
    
});
