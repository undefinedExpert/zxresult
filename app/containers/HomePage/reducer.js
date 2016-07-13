/*
 *
 * HomePage reducer
 *
 */

import { fromJS } from 'immutable';

const initialState = fromJS({});

function homePageReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default homePageReducer;
