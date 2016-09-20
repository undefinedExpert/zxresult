import Chance from 'chance';
import { buildUrlParams } from 'utils/helpers';
import { } from 'lodash';

// Randomize page depending on max resultRange
export function randomizePage(result) {
  const maxPage = result.resultsRange;
  const chance = new Chance();
  // FIXME: There is an issue with defining a default value, when the user first time come to website.
  return chance.integer({ min: 1, max: maxPage });
}

function prepareParams(storeParams, result) {
  const randomPage = randomizePage(result);
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

function validateAndPrepareParams(storeParams, result, higherParams) {
  const params = prepareParams(storeParams, result);
  // Merge params & higherParams
  assignHigherParams(params, higherParams);
  return params;
}

export function buildUrlFromFilters(filters, result, endpoint, higherPriorityParams = {}) {
  const setParams = validateAndPrepareParams(filters, result, higherPriorityParams);
  const requestUrl = buildUrlParams(setParams, endpoint);
  return requestUrl;
}


