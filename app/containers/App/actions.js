/*
 *
 * MovieSearchForm actions
 *
 */

import {
  MOOD_UPDATE,
} from './constants';

export default function moodUpdate(value) {
  return {
    type: MOOD_UPDATE,
    value,
  };
}

// {
//   moodUpdate as mood,
//   defaultAction,
// };
