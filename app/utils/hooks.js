/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import createReducer from 'reducers.js';
import { curry } from 'lodash';


/**
 * @desc Inject an asynchronously loaded reducer
 */
export function injectAsyncReducer(store) {
  return (name, asyncReducer) => {
    store.asyncReducers[name] = asyncReducer; // eslint-disable-line
    store.replaceReducer(createReducer(store.asyncReducers));
  };
}


/**
 * @desc Inject an asynchronously loaded saga
 */
export function injectAsyncSagas(store) {
  return (sagas) => sagas.map(store.runSaga);
}

/**
 * @desc Helper for creating injectors
 */
export function getHooks(store) {
  return {
    injectReducer: injectAsyncReducer(store),
    injectSagas: injectAsyncSagas(store),
  };
}


/**
 * @desc Build range of action types.
 */
const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

export function createRequestTypes(base) {
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
    acc[type] = `${base}_${type}`; // eslint-disable-line
    return acc;
  }, {});
}


/**
 * @desc Convert & replace by regex pattern
 */
export const convertToPattern = curry((pattern, replacement, str) => str.replace(pattern, replacement));


/**
 * @desc Convert & replaces by regex pattern
 */
export function action(type, payload = {}) {
  return { type, ...payload };
}
