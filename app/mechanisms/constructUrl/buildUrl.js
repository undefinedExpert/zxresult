/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */


import _ from 'lodash';
import { stringify } from 'query-string';

import { apiUrl, apiKey } from 'containers/App/constants';


/**
 * pairValueAndRef
 * @desc Pairs our values with they api references
 *
 * @param {Object|number} filter - Current filter on which we will operate
 * @param {Array|null} ref - api reference
 *
 * - if it's an object, map each value with it's api ref key from our filter
 * - if it's a number or string
 * - if it's an array
 *
 * @return {Array}
 */
export function pairValueAndRef(filter, ref) {
  const paramsContainer = [];

  if (_.isObject(filter)) {
    const filterValue = _.map(filter.value, (value, prop) => ({ [filter.ref[prop]]: value }));
    filterValue.forEach((item) => paramsContainer.push(item));
  }

  if (_.isNumber(filter) || _.isString(filter)) {
    paramsContainer.push({ [ref]: filter });
  }

  if (_.isArray(filter)) {
    paramsContainer.push({ [ref]: filter.join(',') });
  }

  return paramsContainer;
}


/**
 * pairParams
 * @desc Pairs our values with they api references
 * @param {Object} filters
 *
 * @return {Object} - paired filters with they api refs
 */
export function pairParams(filters) {
  const pairedParams = [];

  _.keys(filters).forEach((ref) => {
    const filter = filters[ref];
    const pairedValues = pairValueAndRef(filter, ref);

    pairedParams.push(...pairedValues);
  });

  return pairedParams;
}


/**
 * buildUrl
 * @desc Constructs final url basing on filters - if set - and endpoint
 *
 * @param {Object} filters
 * @param {String} endpoint - Url endpoint we wish to reach
 *
 * - handle apiUrl && apiKey potential errors.
 * - if there is no filters
 *
 * TODO: move ApiUrl and apiKey error handler from this function
 * @return {String} - Constructed URL
 */
export function buildUrl(filters, endpoint) {
  if (!apiUrl || !apiKey) throw Error(`apiUrl or apiKey isn't defined: \n apiUrl: ${apiUrl} \n apiKey: ${apiKey}`);

  const baseUrl = `${apiUrl}${endpoint}?${apiKey}`;

  if (!_.isEmpty(filters)) {
    const params = pairParams(filters);
    const query = params.map(item => stringify(item)).join('&');

    console.log(`${baseUrl}&${query}`);
    return `${baseUrl}&${query}`;
  }

  return `${baseUrl}`;
}

