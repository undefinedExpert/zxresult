import Chance from 'chance';

// Randomize page depending on max resultRange
export function randomizePage(result) {
  const maxPage = result.resultsRange;
  const chance = new Chance();
  // FIXME: There is an issue with defining a default value, when the user first time come to website.
  return chance.integer({ min: 1, max: maxPage });
}

export function buildParams(filters, result) {
  const maxPage = result.resultsRange;
  const chance = new Chance();
  // FIXME: There is an issue with defining a default value, when the user first time come to website.
  return chance.integer({ min: 1, max: maxPage });
}


