/*
 *
 * Movie-search-form reducer
 *
 */

import { fromJS } from 'immutable';
import { GET_GENRES_LIST_SUCCESS } from 'containers/App/constants';

const initialState = fromJS({});

function movieSearchFormReducer(state = initialState, action) {
  switch (action.type) {
    case GET_GENRES_LIST_SUCCESS:
      return state
        .setIn(['filters', 'genreList'], action.value);
    default:
      return state;
  }
}

export default movieSearchFormReducer;
