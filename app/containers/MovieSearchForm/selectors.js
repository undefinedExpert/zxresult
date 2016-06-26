import { createSelector } from 'reselect';

/**
 * Direct selector to the movieSearchForm state domain
 */
const selectMovieSearchFormDomain = () => state => state.get('movieSearchForm');

/**
 * Other specific selectors
 */


/**
 * Default selector used by MovieSearchForm
 */

const selectMovieSearchForm = () => createSelector(
  selectMovieSearchFormDomain(),
  (substate) => {
    return {}; //This is where you need to add the state for the container
  }
);

export default selectMovieSearchForm;
export {
  selectMovieSearchForm,
  selectMovieSearchFormDomain,
};
