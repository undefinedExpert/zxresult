import _ from 'lodash';
import { stringify } from 'query-string';
import { apiUrl, apiKey } from 'containers/App/constants';

function pairValueAndRef(filter, key) {
  const paramsContainer = [];

  if (_.isObject(filter)) {
    const filterValue = _.map(filter.value, (value, prop) => ({ [filter.ref[prop]]: value }));
    filterValue.forEach((item) => paramsContainer.push(item));
  }

  if (_.isNumber(filter)) {
    paramsContainer.push({ [key]: filter });
  }

  return paramsContainer;
}

// Attach parameters to baseUrl from endpoint for each filter with their value
function attachParams(filters) {
  const pairedParams = [];
  if (_.isEmpty(filters)) return pairedParams;

  // Run for each filter (genre, decade, trend)
  _.keys(filters).forEach((key) => {
    const filter = filters[key];
    const pairedValues = pairValueAndRef(filter, key);

    pairedParams.push(...pairedValues);
  });

  return pairedParams;
}

// Build URL from params & base
export function buildUrl(filters, endpoint) {
  if (!apiUrl || !apiKey) throw Error(`apiUrl or apiKey isn't defined: \n apiUrl: ${apiUrl} \n apiKey: ${apiKey}`);

  const baseUrl = `${apiUrl}${endpoint}?${apiKey}`;

  let query;
  if (filters) {
    const params = attachParams(filters);
    query = params.map(item => stringify(item)).join('&');
  }

  return `${baseUrl}&${query}`;
}

