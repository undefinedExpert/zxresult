/*
 *
 * Movie-search-form reducer
 *
 */

import { fromJS } from 'immutable';

const initialState = fromJS({});

function movieSearchFormReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default movieSearchFormReducer;
