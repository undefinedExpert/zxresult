import { createSelector, createStructuredSelector } from 'reselect';


const filtersDomain = () => state => state.get('filters').toJS();


// Attach nested filters state proprieties
const selectFilters = () => {
  const filterSelector = createStructuredSelector({
    genre: (state) => state.get('genre'),
    decade: (state) => state.decade,
    trend: (state) => state.decade,
    range: (state) => state.range,
  });
  return createSelector(
    filtersDomain(),
    filterSelector,
    ({ genre, decade, trend, range }) => ({ genre, decade, trend, range })
  );
};

export {
  filtersDomain,
  selectFilters,
};

