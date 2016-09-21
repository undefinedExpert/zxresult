import Chance from 'chance';
import { apiUrl as url, apiKey } from 'containers/App/constants';



// It allows to create multi request type actions
export function buildUrlParams(params, endpoint = '/discover/movie') {
  let urlBase = `${url}${endpoint}?${apiKey}`;
  // Add each param to url
  function attachParams() {
    Object.keys(params).forEach((key) => {
      urlBase += `&${key}=${params[key]}`;
    });
  }
  if (params) attachParams();
  return urlBase;
}

// Randomize page depending on max resultRange
export function randomizePage(result) {
  const maxPage = result.resultsRange;
  const chance = new Chance();
  // FIXME: There is an issue with defining a default value, when the user first time come to website.
  return chance.integer({ min: 1, max: maxPage });
}

function prepareParams(storeParams, result) {
  const randomPage = !result ? randomizePage(result) : null;
  return {
    with_genres: storeParams.genre.active.id,
    page: randomPage, // latest page from api
    'primary_release_date.gte': storeParams.decade.active.rangeMin,
    'primary_release_date.lte': storeParams.decade.active.rangeMax,
    'vote_count.gte': 100, // TODO: trend selector
  };
}

function assignHigherParams(params, higherParams) {
  Object.assign(params, higherParams);
}

export function validateAndPrepareParams(storeParams, result, higherParams) {
  const params = prepareParams(storeParams, result);
  // Merge params & higherParams
  assignHigherParams(params, higherParams);
  return params;
}