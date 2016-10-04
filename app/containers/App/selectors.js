import { createSelector, createStructuredSelector } from 'reselect';

const globalDomain = () => state => state.get('global');

/**
 * Other specific selectors
 */
const filtersDomain = () => createSelector(
  globalDomain(),
  (globalSelect) => globalSelect.get('filters').toJS()
);

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

// Select user
const userDomain = () => createSelector(
  globalDomain(),
  (globalSelect) => globalSelect.get('user').toJS()
);

const selectUser = () => {
  const filterSelector = createStructuredSelector({
    name: (state) => state.username,
  });
  return createSelector(
    userDomain(),
    filterSelector,
    (filtersState) => {
      const username = filtersState.username;
      return { username };
    }
  );
};

// Select result
const resultDomain = () => createSelector(
  globalDomain(),
  (substate) => substate.get('result').toJS()
);

const selectResult = () => {
  const resultSelector = createStructuredSelector({
    movie: (state) => state.movie,
    movies: (state) => state.movies,
    isFetching: (state) => state.isFetching,
    pendingMovies: (state) => state.pendingMovies,
    visitedMovies: (state) => state.visitedMovies,
    noMoreResults: (state) => state.noMoreResults,
  });
  return createSelector(
    resultDomain(),
    resultSelector,
    (resultState) => {
      const movie = resultState.movie;
      const movies = resultState.movies;
      const isFetching = resultState.isFetching;
      const pendingMovies = resultState.pendingMovies;
      const visitedMovies = resultState.visitedMovies;
      const noMoreResults = resultState.noMoreResults;
      return { movie, movies, isFetching, pendingMovies, visitedMovies, noMoreResults };
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
  filtersDomain,
  selectFilters,
  userDomain,
  selectUser,
  resultDomain,
  selectResult,
  selectLocationState,
};
