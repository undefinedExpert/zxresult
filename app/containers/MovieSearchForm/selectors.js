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
    ({ genre, decade, trend, range }) => ({ genre, decade, trend, range })
  );
};

export {
  filtersDomain,
  selectFilters,
};

