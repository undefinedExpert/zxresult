import { createSelector } from 'reselect';

const globalDomain = () => state => state.get('global');

/**
 * Other specific selectors
 */

const selectFilters = () => createSelector(
  globalDomain(),
  (globalSelect) => globalSelect.get('filters').toJS()
);

const selectUser = () => createSelector(
  globalDomain(),
  (substate) => substate.get('username')
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
  selectFilters,
  selectUser,
};
