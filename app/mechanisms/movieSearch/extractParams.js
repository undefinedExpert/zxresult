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

function generateNumber(min, max) {
  return random(min, max);
}


// Randomize page depending on max resultRange
export function randomizePage(storeParams) {
  // Cache all randomized numbers in array, so the randomize function won't select (randomize) then once again
  // We don't want to do that, cause our application analyse each page and takes 5 best results from it
  // And if we met same page again the end user might see the same result.
  const cache = randomizePage.cachedNumbers = randomizePage.cachedNumbers || [];
  const pages = storeParams.range.pages;
  const maxRange = pages > 1000 ? 1000 : pages;
  const maxPage = pages ? 2 : 1;
  const randomNumber = generateNumber(1, maxPage);
  if (cache.indexOf(randomNumber) === -1) {
    cache.push(randomNumber);
    return randomNumber;
  }
  // TODO: what happens when there is no more results?
  // TODO: How to calc how many left?
  if (maxPage === cache.length) {
    console.error('user saw all pages');
  }
  return null;
}


export function validateAndPrepareParams(storeParams, higherParams) {
  const params = prepareParams(storeParams);
  if (storeParams.range.pages) params.page = randomizePage(storeParams);
  // Merge params & higherParams
  assignHigherParams(params, higherParams);
  return params;
}
