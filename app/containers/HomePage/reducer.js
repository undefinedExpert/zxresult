/*
 *
 * HomePage reducer
 *
 */

import { fromJS } from 'immutable';
import { GET_GENRES_LIST_SUCCESS } from 'containers/App/constants';

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
    case GET_GENRES_LIST_SUCCESS:
      return state
        .setIn(['filters', 'genreList'], action.value);
    default:
      return state;
  }
}

export default homePageReducer;
