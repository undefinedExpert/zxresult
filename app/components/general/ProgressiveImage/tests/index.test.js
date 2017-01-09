/**
*  Components are imported in specific (scope based) order:
*  1. Node_modules
*  2. Application
*  3. Module
*/

import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import ProgressiveImage, { sizesDefault } from '../index';


describe('<ProgressiveImage />', () => {
  let path;
  let props;
  beforeEach(() => {
    path = 'http://image.tmdb.org/t/p/w45/viPjZ3JCOahcfNCcVhiPExusJoZ.jpg';
    props = { isActive: false, src: path };
  });

  it('Should reset state sizes each time when there will be new result', () => {
    const component = mount(<ProgressiveImage {...props} />);

    // simulate loading "image"
    const newState = sizesDefault.slice(1);
    component.setState({ sizes: newState });
    expect(component.state().sizes.length).to.eql(newState.length);

    // check if reset when prop changed
    component.setProps({ isActive: true });
    expect(component.state().sizes).to.be.eql(sizesDefault);
  });

  it('should load medium, big sizes and update their states when each finished', () => {
    const component = mount(<ProgressiveImage {...props} />);

    expect(component.state().src).to.eql(null);
    expect(component.state().sizes.length).to.eql(sizesDefault.length);

    // load & check medium
    component.instance().progressiveLoad();
    expect(component.state().src).to.eql(path.replace(/\w154/g, 'w500'));
    expect(component.state().sizes.length).to.eql(sizesDefault.length - 1);

    // load & check big
    component.instance().progressiveLoad();
    expect(component.state().src).to.eql(path.replace(/\w154/g, 'original'));
    expect(component.state().sizes.length).to.eql(sizesDefault.length - 2);
  });
});
