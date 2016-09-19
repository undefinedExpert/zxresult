import { apiUrl as url, apiKey } from 'containers/App/constants';

// It allows to create multi request type actions
export function buildUrlParams(params, endpoint = '/discover/movie') {
  let urlBase = `${url}${endpoint}?${apiKey}`;

  // Add each param to url
  Object.keys(params).forEach((key) => {
    urlBase += `&${key}=${params[key]}`;
  });

  return urlBase;
}
