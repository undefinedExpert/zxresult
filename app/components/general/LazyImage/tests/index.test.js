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

import LazyImage from '../index';


describe('<LazyImage />', () => {
  describe('Methods', () => {
    let props;
    let path;

    beforeEach(() => {
      props = { isActive: false, src: '/eslotwinski' };
      path = `http://image.tmdb.org/t/p/w45/${props.path}`;
    });

    it('should run lazyLoad method when componentDidMount', () => {
      const didMount = sinon.spy(LazyImage.prototype, 'componentDidMount');
      const lazyLoad = sinon.spy(LazyImage.prototype, 'lazyLoad');

      props.isActive = true;
      mount(<LazyImage {...props} />);

      expect(didMount.calledOnce).to.eql(true);
      expect(lazyLoad.calledOnce).to.eql(true);

      didMount.restore();
      lazyLoad.restore();
    });

    it('should run lazyLoad method when componentDidUpdate', () => {
      const lazyLoad = sinon.spy(LazyImage.prototype, 'lazyLoad');

      const component = mount(<LazyImage {...props} />);
      expect(lazyLoad.calledOnce).to.eql(false);

      component.setProps({ isActive: true });
      expect(lazyLoad.calledOnce).to.eql(true);

      lazyLoad.restore();
    });

    it('should break downloading when component componentWillUnmount and we are still downloading image', () => {
      const willUnmount = sinon.spy(LazyImage.prototype, 'componentWillUnmount');
      const replaceLazyLoadImageStub = sinon.stub(LazyImage.prototype, 'replaceLazyLoadImage');
      const component = mount(<LazyImage {...props} />);
      const instance = component.instance();

      expect(willUnmount.calledOnce).to.eql(false);

      // Simulate downloading image
      const loadImage = instance.lazyLoadedImage = new Image();
      loadImage.src = path;
      expect(instance.lazyLoadedImage.attributes.src.value).to.eql(path);

      // Break image downloading when it's in progress
      component.unmount();
      expect(instance.lazyLoadedImage.attributes.src.value).to.eql('');

      replaceLazyLoadImageStub.restore();
      willUnmount.restore();
    });

    it('should mount component and when isActive become true, set state.src to photo path', () => {
      const component = mount(<LazyImage {...props} progressiveLoading />);
      const instance = component.instance();

      let imagePlaceholderSource = instance.imagePlaceholder.props.src;
      expect(imagePlaceholderSource).to.be.eql(null);

      component.setProps({ isActive: true });

      // After setProps reaccess to component instance and check imagePlaceholder
      const expectedUrl = `http://image.tmdb.org/t/p/w45${props.path}`;
      imagePlaceholderSource = instance.imagePlaceholder.props.src;
      expect(imagePlaceholderSource).to.be.eql(expectedUrl);
      expect(component.state().src).to.eql(expectedUrl);
    });
  });
});
