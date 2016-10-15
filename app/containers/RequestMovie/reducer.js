/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import { fromJS } from 'immutable';

import { UPDATE_FILTERS } from 'containers/FilterForm/constants';

import * as CONSTANT from './constants';


const initialState = fromJS({
  active: fromJS(null),
  notSorted: fromJS([]), // Freshly downloaded, before moved to pending need to be analysed.
  pending: fromJS([]),
  cache: fromJS([]),
  noMoreResults: false,
  isFetching: false,
});

function resultReducer(state = initialState, action) {
  switch (action.type) {
    case CONSTANT.UPDATE_MOVIE_RESULT.REQUEST:
      return state
        .setIn(['isFetching'], true);
    case CONSTANT.UPDATE_MOVIE_RESULT.SUCCESS:
      return state
        .setIn(['active'], action.active)
        .setIn(['isFetching'], false);
    case CONSTANT.UPDATE_MOVIE_RESULT.FAILURE:
      return state
        .setIn(['noMoreResults'], true)
        .setIn(['isFetching'], false);
    case CONSTANT.ANALYSE_MOVIE.REQUEST:
      return state
        .setIn(['notSorted'], action.notSorted);
    case CONSTANT.ANALYSE_MOVIE.SUCCESS:
      return state
        .setIn(['pending'], action.pending)
        .setIn(['isFetching'], false);
    case CONSTANT.ANALYSE_MOVIE.FAILURE:
      return state
        .setIn(['isFetching'], false);
    case CONSTANT.UPDATE_SINGLE_MOVIE.SUCCESS:
      return state
        .setIn(['pending'], fromJS(action.removePending));
    case UPDATE_FILTERS.SUCCESS:
      return state
        .setIn(['noMoreResults'], false)
        .setIn(['pending'], fromJS([]));
    default:
      return state;
  }
}

export default resultReducer;
