import { expect } from 'chai';
import {
  genreUpdate,
  moodUpdate,
  resultSet,
} from '../actions';
import {
  GENRE_UPDATE,
  MOOD_UPDATE,
  RESULT_SET,
} from '../constants';

describe('Application actions', () => {
  describe('moodUpdate()', () => {
    it('Should return type and value properties', () => {
      const value = 'test';
      const expected = {
        type: MOOD_UPDATE,
        value,
      };
      expect(moodUpdate(value)).to.eql(expected);
    });
  });

  describe('genreUpdate()', () => {
    it('Should return type and value properties', () => {
      const value = 'test';
      const expected = {
        type: GENRE_UPDATE,
        value,
      };
      expect(genreUpdate(value)).to.eql(expected);
    });
  });

  describe('genreUpdate()', () => {
    it('Should return type, movie, single properties', () => {
      const movies = [{}, {}];
      const single = {};
      const expected = {
        type: RESULT_SET,
        movies,
        single,
      };
      expect(resultSet(movies, single)).to.eql(expected);
    });
  });


});
