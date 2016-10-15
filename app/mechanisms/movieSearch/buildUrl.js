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

function pairValueAndRef() {


  return {}
}

// Attach parameters to baseUrl from endpoint for each filter with their value
function attachParams(filters, baseUrl) {
  let newUrl = `${baseUrl}`;
  // Run for each filter (genre, decade, trend)
  Object.keys(filters).forEach((key) => {
    const filter = filters[key];
    if (filter === null) return;


    // get an arr of each params with their key, value.
    let filterParam = rescueParam(filter.ref);
    let filterValue = rescueValue(filter.value, true);

    // Map both param and value into new object
    if (filterValue) {
      for (const item of filterValue) {
        const propLookForKey = Object.getOwnPropertyNames(item)[0]; // Just one element exist in that objects, we just get it's value
        const uriValue = item[propLookForKey];
        const propName = typeof filterParam === 'string' ? filterParam : filterParam[propLookForKey];
        newUrl += `&${propName}=${uriValue}`;
      }
    }
    if (typeof filter === 'number') newUrl += `&${key}=${filter}`;
  });
  return newUrl;
}

// Build URL from params & base
export function buildUrl(filters, endpoint) {
  try {
    if (apiUrl && apiKey) {
      let baseUrl = `${apiUrl}${endpoint}?${apiKey}`;
      // Attach params if there are any
      if (filters) {
        baseUrl = attachParams(filters, baseUrl);
      }

      if (endpoint === "/discover/movie") {
        console.clear();
        console.log('test:', baseUrl === "http://api.themoviedb.org/3/discover/movie?api_key=9dee05d48efe51f51b15cc63b1fee3f5&primary_release_date.gte=2010-01-01&primary_release_date.lte=2016-01-01&page=1000", baseUrl.replace("http://api.themoviedb.org/3/discover/movie?api_key=9dee05d48efe51f51b15cc63b1fee3f5", ''))
      }
      return baseUrl;
    }
    else {
      throw Error(`apiUrl or apiKey isn't defined: \n apiUrl: ${apiUrl} \n apiKey: ${apiKey}`);
    }
  }
  catch (e) {
    throw new Error(`Couldn't handle buildUrlParams: ${e}`);
  }
}

