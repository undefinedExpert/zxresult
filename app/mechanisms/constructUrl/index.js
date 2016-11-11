/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import { select, call } from 'redux-saga/effects';

import { selectFilters } from 'containers/FilterForm/selectors';

import randomizePage from './randomizePage';
import { buildUrl } from './buildUrl';
import { buildParams } from './extractParams';


/**
 * callToApi
 * @desc Makes API request from current filters options (if withParams set true). It provides an easy way of building final API url
 * which then is used in our call.
 *
 * @param {string} endPoint - What is the endpoint of our API
 * @param {object} higherParams - Does we need to set 'hardcoded' param?
 * @param {boolean} withParams - does this call need params?
 */
export default function* constructUrl(endPoint, higherParams = {}, withParams = true) {
  const filters = yield select(selectFilters());

  let randomPage;
  if (withParams) randomPage = yield call(randomizePage, filters);

  const params = yield call(buildParams, filters, higherParams, withParams, randomPage);

  return yield call(buildUrl, params, endPoint);
}
