/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import sinon from 'sinon';
import { expect } from 'chai';
import { mapDispatch } from '../mapProps';


describe('mapDispatchToProps', () => {
  describe('movieUpdate', () => {
    it('should be injected', () => {
      const dispatch = sinon.spy();
      const returned = mapDispatch(dispatch);
      expect(returned.movieUpdate).to.not.eql(undefined);
    });

    it('should dispatch movieUpdate action', () => {
      const dispatch = sinon.spy();
      const returned = mapDispatch(dispatch);

      returned.movieUpdate();
      expect(dispatch.calledOnce).to.eql(true);
    });
  });
});
