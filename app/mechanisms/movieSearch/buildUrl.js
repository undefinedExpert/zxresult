import Chance from 'chance';
import _ from 'lodash';
import { apiUrl, apiKey } from 'containers/App/constants';

// Looks for value of param, checks all nested objects and gets array of filters values (highly connected with rescueParam)
function rescueValue(parameter, reverse, arr = []) {
  const tempArray = arr;
  _.each(parameter, (valueForApiCall, key) => {
    if (_.isObject(valueForApiCall)) rescueValue(valueForApiCall, reverse, tempArray); // find nested objects
    // push 'valueForApiCall' which is value for api param.
    else if (valueForApiCall) tempArray.push({ [key]: valueForApiCall });
  });
  return tempArray;
}

// Looks for param, checks all nested objects and assigns an object which contain that specific filter endpoint (api uri name, check reducer for more info)
function rescueParam(parameter, reverse, tempObject) {
  const tempObj = tempObject || {};
  _.each(parameter, (extractedApiParam, key) => {
    if (_.isObject(extractedApiParam)) rescueParam(extractedApiParam, reverse, tempObj); // find nested{
    else Object.assign(tempObj, { [key]: extractedApiParam });
  });
  return tempObj;
}

// Attach parameters to baseUrl from endpoint for each filter with their value
function attachParams(filters, baseUrl) {
  let newUrl = `${baseUrl}`;
  // Run for each filter (genre, decade, trend)
  Object.keys(filters).forEach((key) => {
    const filter = filters[key];
    if (!_.isObject(filter)) return;
    // Extract param
    let filterParam = _.cloneDeep(filter.apiParam);
    let filterValue = _.cloneDeep(filter.value);
    // REMOVE NAME PROP, it's not required in process of build uri
    if (filterValue) filterValue.name = undefined;
    // check if it's an object, and get an arr of each params with their key, value.
    if (_.isObject(filterParam)) filterParam = rescueParam(filterParam);
    if (_.isObject(filterValue)) filterValue = rescueValue(filterValue, true);
    // Map both param and value into new object
    if (filterValue) {
      for (const item of filterValue) {
        const propLookForKey = Object.getOwnPropertyNames(item)[0]; // Just one element exist in that objects, we just get it's value
        const uriValue = item[propLookForKey];
        const propName = typeof filterParam === 'string' ? filterParam : filterParam[propLookForKey];
        newUrl += `&${propName}=${uriValue}`;
      }
    }
  });
  return newUrl;
}

// Randomize page depending on max resultRange
export function randomizePage(storeParams, pageLimit) {
  const maxRange = storeParams.range.pages > pageLimit ? pageLimit : storeParams.range.pages;
  const maxPage = storeParams.range.pages ? maxRange : 1;
  const chance = new Chance();
  // FIXME: There is an issue with defining a default value, when the user first time comes to website.
  return chance.integer({ min: 1, max: maxPage });
}

// Build URL from params & base
export function buildUrlParams(filters, endpoint, storeParams) {
  console.clear();
  // FIXME: move randomizePage function from this function into function responded for preparing 'params' (./extractParams.js)
  const page = storeParams.range.pages ? randomizePage(storeParams, filters.page) : 1000;
  let baseUrl = `${apiUrl}${endpoint}?${apiKey}`;
  // Attach params if there are any
  if (filters) baseUrl = attachParams(filters, baseUrl);
  // Adds page into uri query
  baseUrl = page ? `${baseUrl}&page=${page}` : baseUrl;
  console.log(baseUrl);
  return baseUrl;
}

