/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import { expect } from 'chai';
import { sortBy } from 'lodash';
import { LOCATION_CHANGE } from 'react-router-redux';
import { call, put, take, fork } from 'redux-saga/effects';

import { callApi } from 'mechanisms/index';

import { updateFilterGenre, updateFilters } from '../actions';
import { FILTER_GENRE_LIST, UPDATE_FILTERS } from '../constants';
import { getGenreList, handleUpdateFilters, getUpdateFiltersWatcher, getGenresListWatcher, getKeywordListWatcher, getFilterSagas } from '../sagas';


describe('FilterForm saga handlers', () => {
  describe('getGenreList Saga', () => {
    let generator;
    beforeEach(() => {
      generator = getGenreList();

      const task = generator.next().value;
      const operation = call(callApi, '/genre/movie/list', {}, false);
      expect(task).to.eql(operation);
    });

    it('Should handle success action', () => {
      const exceptionalGenreIcon = {
        name: 'Foreign',
        id: 10769,
      };
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

      // Genre list we download from api does not contain this 'genre', this is
      // temporary work-around for missing api icon
      const expectedResult = result.data.genres.concat(exceptionalGenreIcon);
      const sorted = sortBy(expectedResult, 'name');

      const operation = put(updateFilterGenre.list.success(sorted));
      expect(task).to.eql(operation);
    });

    it('Should handle error action', () => {
      const error = new Error();
      const operation = put(updateFilterGenre.list.failure(error));

      expect(generator.next(error).value).to.be.eql(operation);
    });
  });

  describe('handleUpdateFilters Saga', () => {
    let generator;
    beforeEach(() => {
      generator = handleUpdateFilters();

      const task = generator.next().value;
      const operation = call(callApi, '/discover/movie', { page: 1000 });
      expect(task).to.eql(operation);
    });

    it('Should handle success action', () => {
      const result = {
        data: {
          total_pages: 5,
          total_results: 10,
        },
      };
      const task = generator.next(result).value;
      const operation = put(updateFilters.success(result.data.total_pages, result.data.total_results));

      expect(task).to.eql(operation);
    });

    it('Should handle error action', () => {
      const error = new Error();
      const operation = put(updateFilters.failure(error));

      expect(generator.next(error).value).to.be.eql(operation);
    });
  });
});

describe('FilterForm saga watchers', () => {
  describe('getGenreList Watcher', () => {
    const generator = getGenresListWatcher();
    const constant = FILTER_GENRE_LIST.REQUEST;

    it(`should watch for ${constant} action`, () => {
      const taskLoop = generator.next().value;
      const operationLoop = take(constant);
      expect(taskLoop).to.be.eql(operationLoop);

      const taskCall = generator.next(constant).value;
      const operationCall = call(getGenreList);
      expect(taskCall).to.be.eql(operationCall);
    });
  });

  describe('handleUpdateFilters Watcher', () => {
    const generator = getUpdateFiltersWatcher();
    const constant = UPDATE_FILTERS.REQUEST;

    it(`should watch for ${constant} action`, () => {
      const taskLoop = generator.next().value;
      const operationLoop = take(constant);
      expect(taskLoop).to.be.eql(operationLoop);

      const taskCall = generator.next(constant).value;
      const operationCall = call(handleUpdateFilters);
      expect(taskCall).to.be.eql(operationCall);
    });
  });
});

describe('getFilterSagas Saga', () => {
  const movieSagas = getFilterSagas();

  it('should asynchronously fork getGenresListWatcher saga', () => {
    const task = movieSagas.next();
    const operation = fork(getGenresListWatcher);

    expect(task.value).to.be.eql(operation);
  });

  it('should asynchronously fork getUpdateFiltersWatcher saga', () => {
    const task = movieSagas.next();
    const operation = fork(getUpdateFiltersWatcher);

    expect(task.value).to.be.eql(operation);
  });

  it('should asynchronously fork getKeywordListWatcher saga', () => {
    const task = movieSagas.next();
    const operation = fork(getKeywordListWatcher);

    expect(task.value).to.be.eql(operation);
  });

  it('should yield until LOCATION_CHANGE action', () => {
    const task = movieSagas.next();
    const operation = take(LOCATION_CHANGE);

    expect(task.value).to.be.eql(operation);
  });

  it('Should cancel watchers', () => {
    // TODO: Make a working test
    console.warn('TODO');
  });
});
