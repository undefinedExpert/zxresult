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
    case CONSTANT.UPDATE_FILTER_DECADE.REQUEST:
      return state
        .setIn(['filters', 'decade', 'active'], action.value);
    case CONSTANT.UPDATE_FILTER_TREND.REQUEST:
      return state
        .setIn(['filters', 'trend', 'active'], action.value);
    case CONSTANT.UPDATE_FILTER_TREND_LIST.REQUEST:
      return state
        .setIn(['filters', 'trend', 'list'], action.value);
    case CONSTANT.UPDATE_FILTER_GENRE.REQUEST:
      return state
        .setIn(['filters', 'genre', 'active'], action.value);
    case CONSTANT.UPDATE_FILTER_GENRE_LIST.SUCCESS:
      return state
        .setIn(['filters', 'genre', 'list'], action.value);
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
    case CONSTANT.UPDATE_FILTERS.SUCCESS:
      return state
        .setIn(['filters', 'range', 'pages'], action.totalPages)
        .setIn(['filters', 'range', 'results'], action.totalResults)
        .setIn(['filters', 'range', 'pagesCache'], [])
        .setIn(['result', 'noMoreResults'], false)
        .setIn(['result', 'pending'], []);
    case CONSTANT.CACHE_RANDOMIZED_PAGE.REQUEST:
      return state
        .setIn(['filters', 'range', 'pagesCache'], action.page);

    default:
      return state;
  }
}

export default appReducer;
