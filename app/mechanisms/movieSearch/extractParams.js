/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import { each, omitBy, isNil, pick } from 'lodash';


const cleanNull = (active, apiRef) => {
  const activeMinusNull = omitBy(active, isNil);

  const activeKeys = Object.keys(activeMinusNull);
  const cleanedByActive = pick(apiRef, activeKeys);

  return { value: activeMinusNull, ref: cleanedByActive };
};

// Extracts params, their endpoints, values and sets them into single object
// it will be used in 'building url' process (./buildUrl.js)
function defineParams(storeParams) {
  const paramKeys = Object.keys(storeParams);
  const activeParams = paramKeys.filter((key) => storeParams[key].active);
  const container = Object.create(null);

  each(activeParams, key => {
    const {
      active,
      apiRef } = storeParams[key];

    const cleaned = cleanNull(active, apiRef);

    Object.assign(container, { [key]: cleaned });
  });

  return container;
}

// Assign params, values defined directly in sagas
function assignHigherParams(params, higherParams) {
  Object.assign(params, higherParams);
}

export function validateAndPrepareParams(storeParams, higherParams, randomPage) {
  const params = defineParams(storeParams);

  // detect if we need random page
  if (storeParams.range.pages) params.page = randomPage;

  // Merge params & higherParams
  assignHigherParams(params, higherParams);

  return params;
}
