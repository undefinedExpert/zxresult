import { createSelector } from 'reselect';

/**
 * Direct selector to the movieSearchResult state domain
 */
const selectMovieSearchResultDomain = () => state => state.get('home');

/**
 * Other specific selectors
 */


/**
 * Default selector used by MovieSearchResult
 */

const selectMovieSearchResult = () => createSelector(
  selectMovieSearchResultDomain(),
  (substate) => substate.get('username')
);

export default selectMovieSearchResult;
export {
  selectMovieSearchResult,
  selectMovieSearchResultDomain,
};
