/**
*  Components are imported in specific (scope based) order:
*  1. Node_modules
*  2. Application
*  3. Module
*/

import { expect } from 'chai';
import { select, call } from 'redux-saga/effects';

import { selectFilters } from 'containers/FilterForm/selectors';

import { mapGenresWithNames, mapGenres } from '../index';

const globalGenreList = [
  {
    name: 'ShouldNotBeIncluded',
    id: 99,
  },
  {
    name: 'Action',
    id: 28,
  },
  {
    name: 'Animation',
    id: 12,
  },
  {
    name: 'History',
    id: 16,
  },
];
describe('<mapGenresWithNames />', () => {
  const genreIds = [28, 12, 16];

  it('Should returned mapped genres with their names using id property', () => {
    const expected = mapGenresWithNames(genreIds, globalGenreList);
    const result = ['action', 'animation', 'history'];

    expect(expected).to.be.eql(result);
  });

  it('Strings in array should not contain spaces', () => {
    expected
  });

  it('Strings in array should be always lowercase typed', () => {

  });

});

describe('mapGenres()', () => {
  const ids = [15, 52];
  const list = globalGenreList;
  const generator = mapGenres({ genre_ids: ids });

  it('Should call mapGenresWithNames', () => {
    const task = generator.next().value;
    const operation = select(selectFilters());
    expect(task).expectEqual(operation);
  });

  it('Should select genre.list', () => {
    const task = generator.next({ genre: { list } }).value;
    const operation = call(mapGenresWithNames, ids, list);
    expect(task).expectEqual(operation);
    generator.next();
  });
});


