import { createSelector } from 'reselect';

/**
 * Direct selector to the movieSearchForm state domain
 */
const globalDomain = () => state => state.get('global');

/**
 * Other specific selectors
 */


/**
 * Default selector used by MovieSearchForm
 */

const selectFilters = () => createSelector(
  globalDomain(),
  (globalSelect) => globalSelect.get('filters').toJS()
);

export default selectFilters;
export {
  selectFilters,
  globalDomain,
};
