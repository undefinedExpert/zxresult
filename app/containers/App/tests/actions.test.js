import { expect } from 'chai';
import {
  updateFilterGenre,
  updateFilterMood,
  resultSet,
} from '../actions';
import * as CONSTANT from './../constants';


describe('Application actions', () => {
  describe('updateFilterMood()', () => {
    it('Should return type and value properties', () => {
      const value = 'test';
      const expected = {
        type: CONSTANT.UPDATE_FILTER_MOOD.REQUEST,
        value,
      };
      expect(updateFilterMood.active.request(value)).to.eql(expected);
    });
  });

  describe('updateFilterGenre()', () => {
    it('Should return type and value properties', () => {
      const value = 'test';
      const expected = {
        type: CONSTANT.UPDATE_FILTER_GENRE.REQUEST,
        value,
      };
      expect(updateFilterGenre.active.request(value)).to.eql(expected);
    });
  });

  describe('resultSet()', () => {
    it('Should return type, movie, single properties', () => {
      const movies = [{}, {}];
      const single = {};
      const expected = {
        type: CONSTANT.RESULT_SET,
        movies,
        single,
      };
      expect(resultSet(movies, single)).to.eql(expected);
    });
  });
});
