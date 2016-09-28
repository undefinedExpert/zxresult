import { call, select } from 'redux-saga/effects';
import { buildUrlParams } from './buildUrl';
import { validateAndPrepareParams } from './extractParams';
import { selectFilters } from 'containers/App/selectors';
import request from 'utils/request';

export function buildUrlFromFilters(filters, endpoint, higherPriorityParams = {}, withParams) {
  const setParams = withParams ? validateAndPrepareParams(filters, higherPriorityParams) : null;
  const requestUrl = buildUrlParams(setParams, endpoint, filters);
  return requestUrl;
}

export function* callToApi(endPoint, HigherParams, withParams = true) {
  const filters = yield select(selectFilters());
  const prepareParams = yield buildUrlFromFilters(filters, endPoint, HigherParams, withParams);
  const data = yield call(request, prepareParams);
  return data;
}
