import { createSelector } from 'reselect';

/**
 * Direct selector to the homePage state domain
 */
const selectGlobal = () => state => state.get('global');

/**
 * Other specific selectors
 */


/**
 * Default selector used by HomePage
 */

const selectFilters = () => createSelector(
  selectGlobal(),
  (homeState) => homeState.get('filters')
);

export default selectFilters;
export {
  selectFilters,
  selectGlobal,
};
