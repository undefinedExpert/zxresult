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
  describe('onChangeGenre', () => {
    it('should be injected', () => {
      const dispatch = sinon.spy();
      const returned = mapDispatch(dispatch);
      expect(returned.onChangeGenre).to.not.eql(undefined);
    });

    it('should dispatch onChangeGenre action', () => {
      const dispatch = sinon.spy();
      const returned = mapDispatch(dispatch);
      const genre = { id: 35, name: 'Comedy' };

      returned.onChangeGenre({ target: { value: genre } });
      expect(dispatch.calledOnce).to.eql(true);
    });
  });

  describe('getGenreList', () => {
    it('should be injected', () => {
      const dispatch = sinon.spy();
      const returned = mapDispatch(dispatch);
      expect(returned.getGenreList).to.not.eql(undefined);
    });

    it('should dispatch getGenreList action', () => {
      const dispatch = sinon.spy();
      const returned = mapDispatch(dispatch);

      returned.getGenreList();
      expect(dispatch.calledOnce).to.eql(true);
    });
  });

  describe('getUpdateFilters', () => {
    it('should be injected', () => {
      const dispatch = sinon.spy();
      const returned = mapDispatch(dispatch);
      expect(returned.getUpdateFilters).to.not.eql(undefined);
    });

    it('should dispatch getUpdateFilters action', () => {
      const dispatch = sinon.spy();
      const returned = mapDispatch(dispatch);

      returned.getUpdateFilters();
      expect(dispatch.calledOnce).to.eql(true);
    });
  });

  describe('onSubmitForm', () => {
    it('should be injected', () => {
      const dispatch = sinon.spy();
      const returned = mapDispatch(dispatch);
      expect(returned.onSubmitForm).to.not.eql(undefined);
    });

    it('should preventDefault if called with event', () => {
      const preventDefault = sinon.spy();
      const returned = mapDispatch(() => {});
      const evt = { preventDefault };
      returned.onSubmitForm(evt);
      expect(preventDefault.calledWith()).to.eql(true);
    });
  });

  describe('onChangeDecade', () => {
    it('should be injected', () => {
      const dispatch = sinon.spy();
      const returned = mapDispatch(dispatch);
      expect(returned.onChangeDecade).to.not.eql(undefined);
    });

    it('should dispatch onChangeDecade action', () => {
      const dispatch = sinon.spy();
      const returned = mapDispatch(dispatch);
      const decade = { name: '1970s', dateMin: '1970-01-01', dateMax: '1979-01-01' };

      returned.onChangeDecade({ target: { value: decade } });
      expect(dispatch.calledOnce).to.eql(true);
    });
  });

  describe('onChangeTrend', () => {
    it('should be injected', () => {
      const dispatch = sinon.spy();
      const returned = mapDispatch(dispatch);
      expect(returned.onChangeTrend).to.not.eql(undefined);
    });

    it('should dispatch onChangeTrend action', () => {
      const dispatch = sinon.spy();
      const returned = mapDispatch(dispatch);
      const trend = { name: 'Popular',
        voteAverageMin: null,
        voteAverageMax: null,
        voteCountMin: 300,
        voteCountMax: null,
      };

      returned.onChangeTrend({ target: { value: trend } });
      expect(dispatch.calledOnce).to.eql(true);
    });
  });
});
