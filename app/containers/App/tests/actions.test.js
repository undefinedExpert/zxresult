import { expect } from 'chai';
import {
  genreUpdate,
  moodUpdate,
  resultSet,
} from '../actions';
import * as CONSTANT from './../constants';


describe('Application actions', () => {
  describe('moodUpdate()', () => {
    it('Should return type and value properties', () => {
      const value = 'test';
      const expected = {
        type: CONSTANT.UPDATE_FILTER_MOOD.REQUEST,
        value,
      };
      expect(moodUpdate.request(value)).to.eql(expected);
    });
  });

  describe('genreUpdate()', () => {
    it('Should return type and value properties', () => {
      const value = 'test';
      const expected = {
        type: CONSTANT.GENRE_UPDATE,
        value,
      };
      expect(genreUpdate(value)).to.eql(expected);
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
