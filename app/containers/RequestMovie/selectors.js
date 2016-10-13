/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */
import { createSelector, createStructuredSelector } from 'reselect';


/**
 * resultDomain
 * @desc Selects result from store
 */
const resultDomain = () => state => state.get('result').toJS();


/**
 * selectResult
 * @desc Picks all result information.
 */
const selectResult = () => {
  const resultSelector = createStructuredSelector({
    active: ({ active }) => active,
    pending: ({ pending }) => pending,
    visited: ({ visited }) => visited,
    notSorted: ({ notSorted }) => notSorted,
    isFetching: ({ isFetching }) => isFetching,
    noMoreResults: ({ noMoreResults }) => noMoreResults,
  });
  return createSelector(
    resultDomain(),
    resultSelector,
    ({ active, notSorted, isFetching, pending, visited, noMoreResults }) => ({ active, notSorted, isFetching, pending, visited, noMoreResults }),
  );
};

export {
  resultDomain,
  selectResult,
};
