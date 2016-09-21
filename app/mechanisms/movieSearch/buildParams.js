import Chance from 'chance';
import { apiUrl, apiKey } from 'containers/App/constants';

// Add each param to url
function attachParams(params, baseUrl) {
  let newUrl = baseUrl;
  Object.keys(params).forEach((key) => {
    newUrl += `&${key}=${params[key]}`;
  });
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
  const maxPage = storeParams.range.pages ? storeParams.range.pages : 1;
  const chance = new Chance();
  // FIXME: There is an issue with defining a default value, when the user first time come to website.
  return chance.integer({ min: 1, max: maxPage });
}

function prepareParams(storeParams) {
  const randomPage = !storeParams.range.pages ? randomizePage(storeParams) : null;
  return {
    with_genres: storeParams.genre.active.id,
    page: randomPage, // latest page from api
    'primary_release_date.gte': storeParams.decade.active.rangeMin,
    'primary_release_date.lte': storeParams.decade.active.rangeMax,
    'vote_count.gte': 10, // TODO: trend selector
  };
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
