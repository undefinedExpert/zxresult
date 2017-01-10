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
    path = 'size1/eslotwinski';
    props = { src: path, sizes: ['size1', 'size2', 'size3'] };
  });

  it('Should reset state sizes each time when there will be new result', () => {
    const component = mount(
      <ProgressiveImage {...props} >
        <img alt="" />
      </ProgressiveImage>
    );

    // simulate loading "image"
    component.instance().progressiveLoad();

    // one loaded and one removed
    const newSize = props.sizes.slice(2);
    expect(component.state().sizes.length).to.eql(newSize.length);

    // check if reset when prop changed
    // component.setProps({ src: 'new' });
    // expect(component.state().sizes.length).to.be.eql(newState);
  });

  it('should load medium, big sizes and update their states when each finished', () => {
    const component = mount(
      <ProgressiveImage {...props} >
        <img alt="" />
      </ProgressiveImage>
    );

    expect(component.state().src).to.eql(path);
    expect(component.state().sizes.length).to.eql(props.sizes.length - 1);

    // loop over all sizes and load each size
    component.state().sizes.forEach((nextSize) => {
      component.instance().progressiveLoad();

      const prevSize = props.sizes[0];
      const expectedPath = path.replace(prevSize, nextSize);
      expect(component.state().src).to.eql(expectedPath);
    });
  });
});
