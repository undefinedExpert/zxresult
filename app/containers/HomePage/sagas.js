import { take, call, select, put } from 'redux-saga/effects';
import { FILTER_FORM_UPDATE, apiUrl, apiKey } from 'containers/App/constants';
import { selectFilters } from 'containers/App/selectors';
import { resultSet } from 'containers/App/actions';
import request from 'utils/request';
import Chance from 'chance';

// Individual exports for testing
function randomizePage() {
  const chance = new Chance();
  return chance.integer({ min: 0, max: 893 });
}

export function* getRepos() {
  console.info('sagas run');
  const filters = yield select(selectFilters());
  const randomPage = randomizePage();
  const requestUrl = `${apiUrl}/discover/movie?${apiKey}&with_genres=${filters.genre.id}&page=${randomPage}`;

  // If url construction failed
  if (!requestUrl) return;
  const movies = yield call(request, requestUrl);
  if (!movies.err) {
    yield put(resultSet(movies.data, movies.data.results[0]));
  }
}

/**
 * Watches for LOAD_REPOS action and calls handler
 */
export function* getReposWatcher() {
  while (yield take(FILTER_FORM_UPDATE)) {
    yield call(getRepos);
  }
}

/**
 * Root saga manages watcher lifecycle
 */

// Bootstrap sagas
export default [
  getReposWatcher,
];
