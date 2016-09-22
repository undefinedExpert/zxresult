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
  const { genre, decade, trend } = storeParams;

  // Define possible query and check if appropriate option exist, so we could use their options
  const prepared = {
    with_genres: genre.active ? genre.active.id : null,
    page: randomPage,
    'primary_release_date.gte': decade.active ? decade.active.rangeMin : null,
    'primary_release_date.lte': decade.active ? decade.active.rangeMax : null,
    'vote_count.gte': trend.active ? trend.active.voteRange.min : null,
    'vote_count.lte': trend.active ? trend.active.voteRange.max : null,
    'vote_average.gte': trend.active ? trend.active.voteAverage.min : null,
    'vote_average.lte': trend.active ? trend.active.voteAverage.max : null,
  };

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
