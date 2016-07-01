/*
 *
 * MovieSearchForm actions
 *
 */

import {
  DEFAULT_ACTION,
  MOOD_UPDATE,
} from './constants';

function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

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
