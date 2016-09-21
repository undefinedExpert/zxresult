import { buildUrlParams, validateAndPrepareParams } from './buildParams';

export function buildUrlFromFilters(filters, result, endpoint, higherPriorityParams = {}, withParams) {
  const setParams = withParams ? validateAndPrepareParams(filters, result, higherPriorityParams) : null;
  const requestUrl = buildUrlParams(setParams, endpoint);
  return requestUrl;
}
