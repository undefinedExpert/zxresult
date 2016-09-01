import { expect } from 'chai';
import {
  updateFilterGenre,
  updateMovieResult,
} from '../actions';
import * as CONSTANT from './../constants';


describe('Application actions', () => {
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

  describe('updateMovieResult()', () => {
    it('Should return type, movie, single properties', () => {
      const movies = [{}, {}];
      const movie = {};
      const response = {};
      const expected = {
        type: CONSTANT.UPDATE_MOVIE_RESULT.SUCCESS,
        movies,
        movie,
        response,
      };
      expect(updateMovieResult.success(movies, movie, response)).to.eql(expected);
    });
  });
});
