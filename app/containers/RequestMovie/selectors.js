import { createSelector, createStructuredSelector } from 'reselect';


// Select result
const resultDomain = () => state => state.get('result').toJS();

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

export {
  resultDomain,
  selectResult,
};
