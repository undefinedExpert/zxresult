/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import { call } from 'redux-saga/effects';

import request from 'utils/request';
import constructUrl from 'mechanisms/constructUrl';


/**
 * callToApi
 * @desc Makes API request from current filters options (if withParams set true). It provides an easy way of building final API url
 * which then is used in our call.
 *
 * @param {string} endPoint - What is the endpoint of our API
 * @param {object} higherParams - Does we need to set 'hardcoded' param?
 * @param {boolean} withParams - does this call need params?
 *
 * - if we need randomPage
 */
export default function* callToApi(endPoint, higherParams = {}, withParams) {
  const url = yield call(constructUrl, endPoint, higherParams, withParams);

  yield call(request, url);
}
