/*
 *
 * HomePage reducer
 *
 */

import { fromJS } from 'immutable';
import * as CONSTANT from './constants';


const initialState = fromJS({
  isLogged: true,
  result: fromJS({
    active: null,
    notSorted: [], // Freshly downloaded, before moved to pending need to be analysed.
    pending: [],
    cache: [],
    noMoreResults: false,
    isFetching: false,
  }),
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case CONSTANT.UPDATE_MOVIE_RESULT.REQUEST:
      return state
        .setIn(['result', 'isFetching'], true);
    case CONSTANT.UPDATE_MOVIE_RESULT.SUCCESS:
      return state
        .setIn(['result', 'active'], action.active)
        .setIn(['result', 'isFetching'], false);
    case CONSTANT.UPDATE_MOVIE_RESULT.FAILURE:
      return state
        .setIn(['result', 'noMoreResults'], true)
        .setIn(['result', 'isFetching'], false);
    case CONSTANT.ANALYSE_MOVIE.REQUEST:
      return state
        .setIn(['result', 'notSorted'], action.notSorted);
    case CONSTANT.QUEUE_MOVIES.SUCCESS:
      return state
        .setIn(['result', 'pending'], action.pending)
        .setIn(['result', 'isFetching'], false);
    case CONSTANT.QUEUE_MOVIES.FAILURE:
      return state
        .setIn(['result', 'isFetching'], false);
    case CONSTANT.UPDATE_SINGLE_MOVIE.SUCCESS:
      return state
        .setIn(['result', 'pending'], action.removePending);
    default:
      return state;
  }
}

export default appReducer;
