/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import { select, call } from 'redux-saga/effects';

import { selectFilters } from 'containers/FilterForm/selectors';
import { selectResult } from 'containers/RequestMovie/selectors';

import { rankMovies } from './analyseMovie';

/**
 * processMovieAnalyse
 * @desc Ranks our movies in condition of selecting best upcoming result
 */
export function* processMovieAnalyse() {
  const { notSorted, pending } = yield select(selectResult());
  const { range } = yield select(selectFilters());
  const sortedMovies = yield call(rankMovies, notSorted, pending, range);

  return sortedMovies;
}
