/**
*  Components are imported in specific (scope based) order:
*  1. Node_modules
*  2. Application
*  3. Module
*/

import sinon from 'sinon';
import { expect } from 'chai';
import { mount } from 'enzyme';
import React from 'react';

import ProgressiveImage from '../index';


describe('<ProgressiveImage />', () => {
  // it should change img src attr each time loadsize change
  let path;
  let props;
  beforeEach(() => {
    path = 'http://image.tmdb.org/t/p/w45/viPjZ3JCOahcfNCcVhiPExusJoZ.jpg';
    props = { isActive: false, path };
  });

  it('Should reset state sizes each time when there will be new result', () => {
    const willReceiveProps = sinon.spy(ProgressiveImage.prototype, 'componentWillReceiveProps');
    const component = mount(<ProgressiveImage {...props} />);

    // simulate loading "image"
    component.setState({ small: { loaded: true } });
    expect(component.state().small.loaded).to.be.eql(true);

    component.setProps({ isActive: true });
    expect(component.state().small.loaded).to.be.eql(false);
    expect(willReceiveProps.calledOnce).to.be.eql(true);
  });

  it('should load small, medium, big sizes and update their states when each finished', () => {
    const fixtureImage = new Image();
    fixtureImage.src = path;

    // initial checking
    const fakeEvent = { target: fixtureImage };
    const component = mount(<ProgressiveImage {...props} />);
    expect(fixtureImage.attributes.src.value).to.eql(path);
    expect(component.state().small.loaded).to.eql(false);

    // does we loaded small?
    component.instance().progressiveLoad(fakeEvent);
    expect(fixtureImage.attributes.src.value).to.eql(path.replace(/\w45/g, 'w154'));
    expect(component.state().small.loaded).to.eql(true);

    // does we loaded medium?
    component.instance().progressiveLoad(fakeEvent);
    expect(fixtureImage.attributes.src.value).to.eql(path.replace(/\w45/g, 'w500'));
    expect(component.state().medium.loaded).to.eql(true);

    // does we loaded big?
    component.instance().progressiveLoad(fakeEvent);
    expect(fixtureImage.attributes.src.value).to.eql(path.replace(/\w45/g, 'original'));
    expect(component.state().big.loaded).to.eql(true);

    // does we finished loading?
    expect(component.state().isLoading).to.eql(false);
  });
});
