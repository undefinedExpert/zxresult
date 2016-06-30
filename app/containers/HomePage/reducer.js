/*
 *
 * HomePage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
} from './constants';

// Co chcialbym uzyskac?
// const initialState = fromJS({
//   global: {
//     isLogged: true,
//     user: {
//       username: 'Lansky',
//       avatar: 'url',
//       userProfileData: {
//         description: '...',
//         accCreated: '...',
//         comments: [
//           {
//             date: '...',
//             movie: '...',
//             inReplyTo: '...',
//           }
//         ],
//         watchlist: [
//           {
//             // ...
//           }
//         ],
//         statistics: {
//           moviesWatched: '...',
//           comments: '...',
//         }
//       }
//     }
//   },
//   filters {
//     trend: 'custom',
//     mood: 'sad',
//     time: '70s',
//   }
// });

const initialState = fromJS({
  secondHelloWorld: {
    siemanko: 'siema',
    siemankodwa: 'siema2',
  },
  username: 'siemankocotam',
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
