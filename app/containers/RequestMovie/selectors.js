import { createSelector, createStructuredSelector } from 'reselect';


// Select result
const resultDomain = () => state => state.get('result').toJS();

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
