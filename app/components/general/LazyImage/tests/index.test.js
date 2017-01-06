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
  // 3. it should break downloading when component unmount
  // 4. it should load image and replace imagePlaceholder src when it will be available
  // 5. it should render LoadingIndicator when state.isLoading is set to true
  // 6. it should contain ProgressiveImage component
  describe('Methods', () => {
    it('it should run lazyLoad method when componentDidMount', () => {
      const props = { isActive: true, path: '' };
      const didMount = sinon.spy(LazyImage.prototype, 'componentDidMount');
      const lazyLoad = sinon.spy(LazyImage.prototype, 'lazyLoad');

      mount(<LazyImage {...props} />);
      expect(didMount.calledOnce).to.eql(true);
      expect(lazyLoad.calledOnce).to.eql(true);

      didMount.restore();
      lazyLoad.restore();
    });

    it('it should run lazyLoad method when componentDidUpdate', () => {
      const props = { isActive: false, path: '' };
      const lazyLoad = sinon.spy(LazyImage.prototype, 'lazyLoad');

      const component = mount(<LazyImage {...props} />);
      expect(lazyLoad.calledOnce).to.eql(false);

      component.setProps({ isActive: true });
      expect(lazyLoad.calledOnce).to.eql(true);
    });
  });
});
