/*
 *
 * HomePage reducer
 *
 */

import { fromJS } from 'immutable';
import * as CONSTANT from './constants';
import { UPDATE_FILTERS } from 'containers/MovieSearchForm/constants';


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
    case CONSTANT.QUEUE_MOVIES.SUCCESS:
      return state
        .setIn(['pending'], action.pending)
        .setIn(['isFetching'], false);
    case CONSTANT.QUEUE_MOVIES.FAILURE:
      return state
        .setIn(['isFetching'], false);
    case CONSTANT.UPDATE_SINGLE_MOVIE.SUCCESS:
      return state
        .setIn(['pending'], action.removePending);
    case UPDATE_FILTERS.SUCCESS:
      return state
        .setIn(['noMoreResults'], false)
        .setIn(['pending'], fromJS([]));
    default:
      return state;
  }
}

export default resultReducer;
