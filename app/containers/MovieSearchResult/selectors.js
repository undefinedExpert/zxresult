import { createSelector } from 'reselect';

/**
 * Direct selector to the movieSearchResult state domain
 */
const selectMovieSearchResultDomain = () => state => state.get('movieSearchResult');

/**
 * Other specific selectors
 */


/**
 * Default selector used by MovieSearchResult
 */

const selectMovieSearchResult = () => createSelector(
  selectMovieSearchResultDomain(),
  (substate) => substate.get('movieSearchResult')
);

export default selectMovieSearchResult;
export {
  selectMovieSearchResultDomain,
};
