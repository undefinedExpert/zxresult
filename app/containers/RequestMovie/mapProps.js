/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import { createStructuredSelector, createSelector } from 'reselect';

import { updateMovieResult } from './actions';
import { selectResult } from './selectors';


function mapDispatch(dispatch) {
  return {
    requestMovie: () => dispatch(updateMovieResult.request()),
    dispatch,
  };
}

function mapState() {
  return createSelector(
    selectResult(),
    createStructuredSelector({
      active: ({ active }) => active,
      isFetching: ({ isFetching }) => isFetching,
      noMoreResults: ({ noMoreResults }) => noMoreResults,
    }),
  );
}

export {
  mapDispatch,
  mapState,
};
