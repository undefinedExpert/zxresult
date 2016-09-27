import Chance from 'chance';
import _ from 'lodash';
import { apiUrl, apiKey } from 'containers/App/constants';

function rescueValue(parameter, reverse, arr = []) {
  const tempArray = arr;
  _.each(parameter, (extractedApiParam, key) => {
    if (_.isObject(extractedApiParam)) rescueValue(extractedApiParam, reverse, tempArray); // find nested{
    // push 'extractedApiParam' which seem to be api param, we just have to extract a extractedApiParam for our apiParam
    else if (extractedApiParam) tempArray.push({ [key]: extractedApiParam }); // TODO: value for our extractedApiParam
  });
  return tempArray;
}

// Add each param to url
function rescueParam(parameter, reverse, tempObject) {
  const tempObj = tempObject || {};
  _.each(parameter, (extractedApiParam, key) => {
    if (_.isObject(extractedApiParam)) rescueParam(extractedApiParam, reverse, tempObj); // find nested{
    // push 'extractedApiParam' which seem to be api param, we just have to extract a extractedApiParam for our apiParam
    else Object.assign(tempObj, { [key]: extractedApiParam }); // TODO: value for our extractedApiParam
  });
  return tempObj;
}

function attachParams(filters, baseUrl) {
  let newUrl = `${baseUrl}&page=${filters.page}`;
  console.clear();


  // Run for each filter (genre, decade, trend)
  Object.keys(filters).forEach((key) => {
    if (!_.isObject(filters[key])) return;
    // Extract param
    let filterParam = _.cloneDeep(filters[key].apiParam);
    let filterValue = _.cloneDeep(filters[key].value);
    // REMOVE NAME PROP, it's not required in process of build uri
    if (filterValue) filterValue.name = undefined;
    // check if it's an object, and get an arr of each params with their key, value.
    if (_.isObject(filterParam)) filterParam = rescueParam(filterParam);
    if (_.isObject(filterValue)) filterValue = rescueValue(filterValue, true);

    if (filterValue) {
      for (let item of filterValue) {
        const propLookForKey = Object.getOwnPropertyNames(item)[0];
        const uriValue = item[propLookForKey];
        const propName = filterParam[propLookForKey];
        newUrl += `&${propName}=${uriValue}`;
        // mappedProps.push({ [propName]: uriValue });
      }
    }
  });
  console.log(newUrl);
  return newUrl;
}

// Build url with params
export function buildUrlParams(filters, endpoint) {
  // TODO: PARAMS for genre (string) and random page generator
  // const randomPage = storeParams.range.pages ? randomizePage(storeParams) : null;
  let baseUrl = `${apiUrl}${endpoint}?${apiKey}`;
  if (filters) baseUrl = attachParams(filters, baseUrl);
  return baseUrl;
}

// Randomize page depending on max resultRange
export function randomizePage(storeParams) {
  const maxRange = storeParams.range.pages > 1000 ? 1000 : storeParams.range.pages;
  const maxPage = storeParams.range.pages ? maxRange : 1;

  const chance = new Chance();
  // FIXME: There is an issue with defining a default value, when the user first time come to website.
  return chance.integer({ min: 1, max: maxPage });
}


function defineParams(storeParams) {
  const paramKeys = Object.keys(storeParams).filter((key) => storeParams[key].active);
  const schema = { storeParams };
  schema.newly = schema.newly || {};

  _.each(paramKeys, key => {
    const value = schema.storeParams[key].active;
    const apiParam = schema.storeParams[key].apiParamName;
    Object.assign(schema.newly, { [key]: { value, apiParam } });
  });

  return schema.newly;
}

function prepareParams(storeParams) {
  // Define possible query and check if appropriate option exist, so we could use their options
  const prepared = defineParams(storeParams);
  // Remove null keys so they won't be used in our url
  Object.keys(prepared).forEach((key) => {
    if (!prepared[key]) delete prepared[key];
  });
  return prepared;
}

function assignHigherParams(params, higherParams) {
  Object.assign(params, higherParams);
}

export function validateAndPrepareParams(storeParams, higherParams) {
  const params = prepareParams(storeParams);
  // Merge params & higherParams
  assignHigherParams(params, higherParams);
  return params;
}
