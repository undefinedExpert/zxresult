import { take, call, select, put, fork, cancel } from 'redux-saga/effects';
import { FILTER_FORM_UPDATE } from 'containers/App/constants';
import { selectFilters } from 'containers/App/selectors';
import { LOCATION_CHANGE } from 'react-router-redux';
import { resultSet } from 'containers/App/actions';
import request from 'utils/request';
import _ from 'lodash';
import Chance from 'chance';
import retext from 'retext';
import nlcstToString from 'nlcst-to-string';
import filterKeywords from 'retext-keywords';
const url = 'http://api.themoviedb.org/3';
const apiKey = 'api_key=9dee05d48efe51f51b15cc63b1fee3f5';


// Individual exports for testing
function randomizePage() {
  const chance = new Chance();
  return chance.integer({ min: 0, max: 250 });
}

function prepareSentence(text) {
  const tempArray = [];
  // running retext process to split sentence into keywords
  retext().use(filterKeywords).process(text, (err, file) => {
    const space = file.namespace('retext');
    space.keywords.forEach((keyword) => {
      tempArray.push(nlcstToString(keyword.matches[0].node));
    });
  });
  return tempArray;
}

const params = {
  genres: [],
  year: [],
  crew: [],
  country: [],
  keywords: [],
};

function* settleParam(filters, keywords) {
  // Is it genre?
  for (let i = 0, len = keywords.length; i < len; i++) {
    const keyword = keywords[i];
    const capitalKeyword = _.upperFirst(keyword);

    // it is a genre?
    const isGenre = yield _.find(filters.genreList, _.matchesProperty('name', capitalKeyword));
    if (isGenre) {
      params.genres.push(isGenre);
      console.info(`params genre added: ${isGenre.name}`);
      continue;
    }
  }
}

function* rateKeywords(filters) {
  // Zaktualizowac wyniki 'przeszukiwania' na realne keywordsy
  const keywords = prepareSentence(filters.sentence);
  const settledParams = yield settleParam(filters, keywords);
  console.log(settledParams);
}

// Construct end url from data
function* constructUrl() {
  const randomNumber = randomizePage();
  const filters = yield select(selectFilters());
  const keywords = yield rateKeywords(filters);
  if (params.genres.length <= 0) return false;
  // Return constructed URL
  return `${url}/discover/movie?${apiKey}&with_genres=${params.genres[0].id}`;
}

export function* getRepos() {
  console.info('sagas run');
  const requestUrl = yield constructUrl();

  // If url construction failed
  if (!requestUrl) return;
  const movies = yield call(request, requestUrl);
  console.log(movies);
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
export function* githubData() {
  // Fork watcher so we can continue execution
  const watcher = yield fork(getReposWatcher);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  getReposWatcher,
];