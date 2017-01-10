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
    let mockup;

    beforeEach(() => {
      props = { src: '/eslotwinski' };
      mockup = (
        <LazyImage src={props.src}>
          <img role="presentation" />
        </LazyImage>
      );
    });

    it('should run lazyLoad method when componentDidMount', () => {
      const didMount = sinon.spy(LazyImage.prototype, 'componentDidMount');
      const lazyLoad = sinon.spy(LazyImage.prototype, 'lazyLoad');
      mount(mockup);

      expect(didMount.calledOnce).to.eql(true);
      // expect(lazyLoad.calledOnce).to.eql(true);

      didMount.restore();
      lazyLoad.restore();
    });

    it('should run lazyLoad method when componentDidUpdate', () => {
      const lazyLoad = sinon.spy(LazyImage.prototype, 'lazyLoad');

      mount(mockup);
      expect(lazyLoad.calledOnce).to.eql(true);

      lazyLoad.restore();
    });

    it('should break downloading when component componentWillUnmount and we are still downloading image', () => {
      const willUnmount = sinon.spy(LazyImage.prototype, 'componentWillUnmount');
      const replaceLazyLoadImageStub = sinon.stub(LazyImage.prototype, 'replaceLazyLoadImage');
      const component = mount(mockup);
      const instance = component.instance();

      expect(willUnmount.calledOnce).to.eql(false);

      // Simulate downloading image
      const loadImage = instance.lazyLoadedImage = new Image();
      loadImage.src = props.src;
      expect(instance.lazyLoadedImage.attributes.src.value).to.eql(props.src);

      // Break image downloading when it's in progress
      component.unmount();
      expect(instance.lazyLoadedImage.attributes.src.value).to.eql('');

      replaceLazyLoadImageStub.restore();
      willUnmount.restore();
    });
  });
});
