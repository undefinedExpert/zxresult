/**
*  Components are imported in specific (scope based) order:
*  1. Node_modules
*  2. Application
*  3. Module
*/

import sinon from 'sinon';
import { expect } from 'chai';
import { shallow, render, mount } from 'enzyme';
import React from 'react';

import LazyImage from '../index';


describe('<LazyImage />', () => {
  // 1. it should run lazy load when component mount && is active, and imagePlaceholder exist
  // 2. it should load image when component 'get' into view (or is available)
  // 3. it should break downloading when component unmount
  // 4. it should load image and replace imagePlaceholder src when it will be available
  // 5. it should render LoadingIndicator when state.isLoading is set to true
  // 6. it should contain ProgressiveImage component
  describe('componentDidMount', () => {
    it('it should run lazy load when component mount && is active, and imagePlaceholder exist', () => {
      const props = { isActive: true, path: '' };
      const didMount = sinon.spy(LazyImage.prototype, 'componentDidMount');
      const lazyLoad = sinon.spy(LazyImage.prototype, 'lazyLoad');

      mount(<LazyImage {...props} />);
      expect(didMount.calledOnce).to.eql(true);
      expect(lazyLoad.calledOnce).to.eql(1);
    });
  });
});
