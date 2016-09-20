import Chance from 'chance';
import { buildUrlParams } from 'utils/helpers';

// Randomize page depending on max resultRange
export function randomizePage(result) {
  const maxPage = result.resultsRange;
  const chance = new Chance();
  // FIXME: There is an issue with defining a default value, when the user first time come to website.
  return chance.integer({ min: 1, max: maxPage });
}

export function buildParams(filters, result, endpoint) {
  const randomPage = randomizePage(result);
  const params = {
    with_genres: filters.genre.active.id,
    page: randomPage,
    'primary_release_date.gte': `${filters.decade.active.rangeMin}`,
    'primary_release_date.lte': `${filters.decade.active.rangeMax}`,
    'vote_count.gte': 20,
  };
  const requestUrl = buildUrlParams(params, endpoint);
  return requestUrl;
}


