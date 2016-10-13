/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import { createSelector, createStructuredSelector } from 'reselect';

/**
 * filtersDomain
 * @desc Selects filter from store
 */
const filtersDomain = () => state => state.get('filters').toJS();


/**
 * selectFilters
 * @desc Picks all filters from filter
 */
const selectFilters = () => {
  const filterSelector = createStructuredSelector({
    genre: ({ genre }) => genre,
    trend: ({ trend }) => trend,
    range: ({ range }) => range,
    decade: ({ decade }) => decade,
  });
  return createSelector(
    filtersDomain(),
    filterSelector,
    ({ genre, trend, range, decade }) => ({ genre, trend, range, decade })
  );
};

export {
  filtersDomain,
  selectFilters,
};

