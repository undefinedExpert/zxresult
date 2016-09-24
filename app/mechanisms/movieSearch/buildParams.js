import Chance from 'chance';
import _ from 'lodash';
import { apiUrl, apiKey } from 'containers/App/constants';
import { mapApiMovieSearchParams } from './constants';

// Add each param to url
function attachParams(params, baseUrl) {
  let newUrl = baseUrl;
  Object.keys(params).forEach((key) => {
    newUrl += `&${key}=${params[key]}`;
  });
  console.log(newUrl);
  return newUrl;
}

// Build url with params
export function buildUrlParams(params, endpoint) {
  let baseUrl = `${apiUrl}${endpoint}?${apiKey}`;
  if (params) baseUrl = attachParams(params, baseUrl);
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

// TODO: Refactor
function recursivechange(params){
  (function (obj) { // IIFE so you don't pollute your namespace
    // define things you can share to save memory
    var map = Object.create(null);
    map['true'] = true;
    map['false'] = false;
    // the recursive iterator
    function walker(obj) {
      var k,
        has = Object.prototype.hasOwnProperty.bind(obj);
      for (k in obj) if (has(k)) {
        switch (typeof obj[k]) {
          case 'object':
            walker(obj[k]); break;
          case 'string':
            if (obj[k].toLowerCase() in map) obj[k] = map[obj[k].toLowerCase()]
        }
      }
    }
    // set it running
    walker(obj);
  }(params));
}

function renameParamsToApiKeys(params) {
//   const loled = mapApiMovieSearchParams;
//   const cloned = _.clone(mapApiMovieSearchParams);
//   function z(object){
//     _.each(object, function(value, key){
//       if(_.isObject(value)){
//         z(value);
//       }else{
//         debugger;
//         object[key] = (value === "lol") ? false : value;
//       }
//     });
//   }
//
// // z(params);
// // console.log(params)
//   debugger;

  let paramsContainer = {};

  _.each(params, (value, key) => {
    let queryName = key;
    // zamiast zmieniac nazwy dac odwolanie w redux.
    queryName = mapApiMovieSearchParams[queryName] || queryName;
    paramsContainer[queryName] = value;
  });
  return paramsContainer;

}


function defineParams(storeParams) {
  const randomPage = storeParams.range.pages ? randomizePage(storeParams) : null;
  const { genre, decade, trend } = storeParams;
  let schema = { storeParams, mapApiMovieSearchParams };
  schema.newly = schema.newly || {};


  const paramKeys = Object.keys(storeParams).filter((key) => storeParams[key].active);

  _.each(paramKeys, key => {
    let value = schema.storeParams[key].active;
    let param = schema.storeParams[key].apiParamName;
    let parameter = { value, param };
    Object.assign(schema.newly, { [key]: { value, param } });
  });



  return schema.newly;
}

function prepareParams(storeParams) {
  // Define possible query and check if appropriate option exist, so we could use their options
  const prepared = defineParams(storeParams);

  // const getParams = renameParamsToApiKeys(prepared);

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
