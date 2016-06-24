/*
 *
 * MovieSearchResult reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
} from './constants';

// The initial state of the App
const initialState = fromJS( {
  username: '',
} );

function movieSearchResultReducer( state = initialState, action ) {
  switch ( action.type ) {
    case DEFAULT_ACTION:

      // Delete prefixed '@' from the github username
      return state
        .set( 'username', action.name );
    default:
      return state;
  }
}

export default movieSearchResultReducer;
