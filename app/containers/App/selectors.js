import { createSelector, createStructuredSelector } from 'reselect';

const globalDomain = () => state => state.get('global');

/**
 * Other specific selectors
 */

// Select result
const resultDomain = () => createSelector(
  globalDomain(),
  (substate) => substate.get('result').toJS()
);

const selectResult = () => {
  const resultSelector = createStructuredSelector({
    active: (state) => state.active,
    notSorted: (state) => state.notSorted,
    isFetching: (state) => state.isFetching,
    pending: (state) => state.pending,
    visited: (state) => state.visited,
    noMoreResults: (state) => state.noMoreResults,
  });
  return createSelector(
    resultDomain(),
    resultSelector,
    (resultState) => {
      const active = resultState.active;
      const notSorted = resultState.notSorted;
      const isFetching = resultState.isFetching;
      const pending = resultState.pending;
      const visited = resultState.visited;
      const noMoreResults = resultState.noMoreResults;
      return { active, notSorted, isFetching, pending, visited, noMoreResults };
    }
  );
};
// selectLocationState expects a plain JS object for the routing state
const selectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

export {
  globalDomain,
  resultDomain,
  selectResult,
  selectLocationState,
};
