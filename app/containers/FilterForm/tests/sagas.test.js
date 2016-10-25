/**
 * Tests for HomePage sagas
 */

import { expect } from 'chai';
// import { takeLatest } from 'redux-saga';
// import { LOCATION_CHANGE } from 'react-router-redux';
import { call, put } from 'redux-saga/effects';

import { callApi } from 'mechanisms/index';

import { updateFilterGenre } from '../actions';
import { getGenreList } from '../sagas';

describe('getGenreList Saga', () => {
  let generator;
  beforeEach(() => {
    generator = getGenreList();

    const task = generator.next().value;
    const operation = call(callApi, '/genre/movie/list', {}, false);
    expect(task).to.eql(operation);
  });

  it('Should handle success action', () => {
    const result = {
      data: {
        genres: [
          {
            name: 'Sample genre',
          },
          {
            name: 'Sample genre',
          },
        ],
      },
    };
    const task = generator.next(result).value;
    const operation = put(updateFilterGenre.list.success(result.data.genres));

    expect(task).to.eql(operation);
  });

  it('Should handle error action', () => {
    const error = new Error;
    const operation = put(updateFilterGenre.list.failure(error));

    expect(generator.next(error).value).to.be.eql(operation);
  });
});
