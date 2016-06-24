/*
 *
 * Form actions
 *
 */

import {
  DEFAULT_ACTION,
} from './constants';

export function defaultAction(name) {
  return {
    type: DEFAULT_ACTION,
    name
  };
}
