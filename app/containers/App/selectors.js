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

const selectMood = () => createSelector(
  selectFilters(),
  (substate) => (substate.mood)
);

const selectGenre = () => createSelector(
  selectFilters(),
  (substate) => (substate.genre)
);

const selectGenreList = () => createSelector(
  selectFilters(),
  (substate) => (substate.genreList)
);

const struct = createStructuredSelector({
  mood: (substate) => substate.mood,
  genre: (substate) => substate.genre,
  genreList: (substate) => substate.genreList,
});

// const getFilters = () => createSelector({
//   selectFilters(),
//   struct,
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
  selectMood,
  selectGenre,
  selectGenreList,
  selectUsername,
  selectFilters,
  selectUser,
  selectResult,
  selectSingleResult,
};
