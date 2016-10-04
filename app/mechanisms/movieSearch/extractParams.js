import { each, random } from 'lodash';

// Extracts params, their endpoints, values and sets them into single object
// it will be used in 'building url' process (./buildUrl.js)
function defineParams(storeParams) {
  const paramKeys = Object.keys(storeParams).filter((key) => storeParams[key].active);
  const schema = { storeParams };
  schema.storeContainer = schema.storeContainer || {};

  each(paramKeys, key => {
    const value = schema.storeParams[key].active;
    const apiParam = schema.storeParams[key].apiParamName;
    Object.assign(schema.storeContainer, { [key]: { value, apiParam } });
  });
  return schema.storeContainer;
}

// Remove all null parameters (we don't want to loop for empty objects)
function prepareParams(storeParams) {
  // Define possible query and check if appropriate option exist, so we could use their options
  const prepared = defineParams(storeParams);
  // Remove null keys so they won't be used in our url
  Object.keys(prepared).forEach((key) => {
    if (!prepared[key]) delete prepared[key];
  });
  return prepared;
}

// Assign params, values defined directly in sagas
function assignHigherParams(params, higherParams) {
  Object.assign(params, higherParams);
}

export function generateNumber(min, max) {
  return random(min, max);
}

export function validateAndPrepareParams(storeParams, higherParams, randomPage) {
  const params = prepareParams(storeParams);
  if (storeParams.range.pages) params.page = randomPage;
  // Merge params & higherParams
  assignHigherParams(params, higherParams);
  return params;
}
