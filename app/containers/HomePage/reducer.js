/*
 *
 * HomePage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
} from './constants';

const initialState = fromJS({
  isLogged: true,
  filters: {
    mood: 'Sad',
    trend: 'Classical',
    decade: '90s',
  },
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

function homePageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default homePageReducer;
