/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import { each, omitBy, isNil, pick } from 'lodash';


/**
 * cleanNull
 * @desc Removes empty values (trashes) from our upcoming params.
 * @param {object} active - Object we will test in the condition of contain null values.
 * @param {object} apiRef - Remove the same properties from our object
 *
 * @return {object} - Return value and it's ref as an object
 */
const cleanNull = (active, apiRef) => {
  const activeMinusNull = omitBy(active, isNil);

  const activeKeys = Object.keys(activeMinusNull);
  const cleanedByActive = pick(apiRef, activeKeys);

  return { value: activeMinusNull, ref: cleanedByActive };
};


/**
 * iterateWithCleaner
 * @desc Iterates through an object, clean no needed values.
 * @param {object} iterated - objects key we will iterate
 * @param {object} whatValues - what values we wish to clean out
 *
 * @return {object} - contains set of params.
 */
const iterateWithCleaner = (iterated, whatValues) => {
  const wrapper = Object.create(null);
  each(iterated, key => {
    const {
      active,
      apiRef } = whatValues[key];

    const cleaned = cleanNull(active, apiRef);

    Object.assign(wrapper, { [key]: cleaned });
  });

  return wrapper;
};


/**
 * defineParams
 * @desc Extract values and it's API refs.
 * @param {object} filters - extraction object
 *
 * @return {object} - returns all cleaned filters wrapped in container
 */
function defineParams(filters) {
  const paramKeys = Object.keys(filters);
  const activeParams = paramKeys.filter((key) => filters[key].active);
  const container = iterateWithCleaner(activeParams, filters);

  return container;
}


/**
 * validateAndPrepareParams
 * @desc Verify our params, clean null values and take only active filters. Assign hardcoded higherParams
 * They allow us to define a hardcoded value (eg. page)
 *
 * @param {object} filters - Contains our params
 * @param {object} higherParams - Higher params set directly in sagas
 * @param {object} randomPage - Page we'll get
 */
export function constructParams(filters, higherParams, randomPage) {
  const params = defineParams(filters);

  // detect if we even need random page
  if (filters.range.pages) params.page = randomPage;

  // Merge params & higherParams
  Object.assign(params, higherParams);

  return params;
}
