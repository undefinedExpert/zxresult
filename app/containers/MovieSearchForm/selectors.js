import { createSelector, createStructuredSelector } from 'reselect';


const filtersDomain = () => state => state.get('filters').toJS();


// Attach nested filters state proprieties
const selectFilters = () => {
  const filterSelector = createStructuredSelector({
    genre: ({ genre }) => genre,
    trend: ({ trend }) => trend,
    range: ({ range }) => range,
    decade: ({ decade }) => decade,
  });
  return createSelector(
    filtersDomain(),
    filterSelector,
    ({ genre, trend, range, decade }) => ({ genre, trend, range, decade })
  );
};

export {
  filtersDomain,
  selectFilters,
};

