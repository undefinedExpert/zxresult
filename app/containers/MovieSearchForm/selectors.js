import { createSelector } from 'reselect';

/**
 * Direct selector to the movieSearchForm state domain
 */
const selectMovieSearchFormDomain = () => state => state.get('global');

/**
 * Other specific selectors
 */


/**
 * Default selector used by MovieSearchForm
 */

const selectMovieSearchForm = () => createSelector(
  selectMovieSearchFormDomain(),
  (substate) => substate.get('secondHelloWorld')
);

export default selectMovieSearchForm;
export {
  selectMovieSearchForm,
  selectMovieSearchFormDomain,
};
