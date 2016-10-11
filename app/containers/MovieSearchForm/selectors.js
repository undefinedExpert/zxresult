// todo: split app selectors
import { createSelector, createStructuredSelector } from 'reselect';


const filtersDomain = () => state => state.get('global').toJS();

// Attach nested filters state proprieties
const selectFilters = () => {
  const filterSelector = createStructuredSelector({
    genre: (state) => state.genre,
    decade: (state) => state.decade,
    trend: (state) => state.decade,
    range: (state) => state.range,
  });
  return createSelector(
    filtersDomain(),
    filterSelector,
    (filtersState) => {
      const genre = filtersState.genre;
      const decade = filtersState.decade;
      const trend = filtersState.trend;
      const range = filtersState.range;
      return { genre, decade, trend, range };
    }
  );
};

export {
  filtersDomain,
  selectFilters,
};

