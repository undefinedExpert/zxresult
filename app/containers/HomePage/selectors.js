import { createSelector } from 'reselect';

/**
 * Direct selector to the homePage state domain
 */
const selectHomePageDomain = () => state => state.get('home');

/**
 * Other specific selectors
 */


/**
 * Default selector used by HomePage
 */

const selectHomePage = () => createSelector(
  selectHomePageDomain(),
  (homeState) => homeState.get('secondHelloWorld')
);

export default selectHomePage;
export {
  selectHomePage,
  selectHomePageDomain,
};
