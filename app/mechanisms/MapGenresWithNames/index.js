/**
*  Components are imported in specific (scope based) order:
*  1. Node_modules
*  2. Application
*  3. Module
*/

import { select, call } from 'redux-saga/effects';

import { selectFilters } from 'containers/FilterForm/selectors';


/**
* MapGenresWithNames
* @desc Returns names of genres included in single movie
*/
export const mapGenresWithNames = (ids, list) => {
  const final = [];

  ids.forEach((id) => {
    const filtered = list.filter((element) => element.id === id);
    filtered.forEach((item) => final.push(item.name.toLowerCase()));
  });

  return final;
};


/**
 * mapGenres
 * @desc Map through genre list and return just the genre names.
 * @return {Array} genres - Names of movie genres
 */
export function* mapGenres(movie) {
  const ids = movie.genre_ids;
  const { genre: { list } } = yield select(selectFilters());
  const filtered = yield call(mapGenresWithNames, ids, list);

  return filtered;
}

export default mapGenres;
