import { createSelector, createStructuredSelector } from 'reselect';

const globalDomain = () => state => state.get('global');

/**
 * Other specific selectors
 */
// TODO: Refactor selectors
const selectFilters = () => createSelector(
  globalDomain(),
  (globalSelect) => globalSelect.get('filters').toJS()
);

const filterSelector = createStructuredSelector({
  mood: (state) => state.mood,
  genre: (state) => state.genre,
  genreList: (state) => state.genreList,
});

const getFilters = () => createSelector(
    selectFilters(),
    filterSelector,
    (filtersState) => {
      const mood = filtersState.mood;
      const genre = filtersState.genre;
      const genreList = filtersState.genreList;
      return { mood, genre, genreList };
    }
);

// const getFilters = () => createSelector({
//   selectFilters(),
//   struct,
//   (cs) => {
//     const mood = cs.mood;
//     const genre = cs.genre;
//  
//     return {mood, genre};
//   }
// )};


// Select user
const selectUser = () => createSelector(
  globalDomain(),
  (globalSelect) => globalSelect.get('user').toJS()
);

const selectUsername = () => createSelector(
  selectUser(),
  (substate) => substate.get('username').toJS()
);

// Select result
const selectResult = () => createSelector(
  globalDomain(),
  (substate) => substate.get('result').toJS()
);

const selectSingleResult = () => createSelector(
  selectResult(),
  (substate) => substate.movie
);

const selectTest = () => createSelector(
  selectFilters(),
  (substate) => console.log(substate)
);

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
  selectLocationState,
  globalDomain,
  selectUsername,
  selectFilters,
  selectUser,
  selectResult,
  selectSingleResult,
  getFilters,
};
