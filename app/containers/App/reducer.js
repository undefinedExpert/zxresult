/*
 *
 * HomePage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  MOOD_UPDATE,
} from './constants';

const initialState = fromJS({
  isLogged: true,
  filters: fromJS({
    mood: 'Funny',
    trend: 'Classical',
    decade: '90s',
  }),
  user: {
    name: 'Emanuel',
    avatar: 'https://avatars0.githubusercontent.com/u/5350669?v=3&s=460',
    watchList: [
      {
        name: 'Titanic',
        decade: '90s',
        rating: 86,
        popularity: 90,
      },
    ],
  },
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case MOOD_UPDATE:
      return state
        .setIn(['filters', 'mood'], action.value);
    default:
      return state;
  }
}

export default appReducer;
