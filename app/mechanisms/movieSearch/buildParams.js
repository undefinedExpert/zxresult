import Chance from 'chance';
import { each } from 'lodash';
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
function renameParamsToApiKeys(params) {
  let paramsContainer = {};
  each(params, (value, key) => {
    let queryName = key;
    queryName = mapApiMovieSearchParams[queryName] || queryName;
    paramsContainer[queryName] = value;
  });
  return paramsContainer;
}

function prepareParams(storeParams) {
  console.log('store params: ', storeParams);
  const randomPage = storeParams.range.pages ? randomizePage(storeParams) : null;
  const { genre, decade, trend } = storeParams;
  // Define possible query and check if appropriate option exist, so we could use their options
  const prepared = {
    genre: genre.active ? genre.active.id : null,
    page: randomPage,
    rangeMin: decade.active ? decade.active.rangeMin : null,
    rangeMax: decade.active ? decade.active.rangeMax : null,
    voteRangeMin: trend.active ? trend.active.voteRange.min : null,
    voteRangeMax: trend.active ? trend.active.voteRange.max : null,
    voteAverageMin: trend.active ? trend.active.voteAverage.min : null,
    voteAverageMax: trend.active ? trend.active.voteAverage.max : null,
  };

  const renamedParams = renameParamsToApiKeys(prepared);
  console.log(renamedParams);

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
