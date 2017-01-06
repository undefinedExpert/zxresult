/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import { createSelector } from 'reselect';

/**
 * filtersDomain
 * @desc Selects filter from store
 */
const filtersDomain = () => state => state.get('filters').toJS();


/**
 * selectFilters
 * @desc Picks all filters from filter
 */
const selectFilters = () => createSelector(
  filtersDomain(),
  ({ keyword, genre, trend, range, decade, runtime }) => ({ keyword, genre, trend, range, decade, runtime })
);

export {
  filtersDomain,
  selectFilters,
};

