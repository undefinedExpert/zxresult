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
//discover/movie
const apiKey = 'api_key=9dee05d48efe51f51b15cc63b1fee3f5';

//search/company

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

function* detectCompany(keyword) {
  const companyUrl = `${url}/search/company?${apiKey}&${keyword}`;
  const isCompany = yield call(request, companyUrl);

  if (!isCompany.err) {
    console.log(isCompany);
  }
}

function settleParam(filters, keywords) {
  // Is it genre?
  const params = {
    genres: [],
    companies: [],
    year: [],
    crew: [],
    country: [],
    keywords: [],
  };

  for(let i = 0, len = keywords.length; i < len; i++) {
    const keyword = keywords[i];
    const capitalKeyword = _.upperFirst(keyword);

    // it is a genre?
    const isGenre = _.find(filters.genreList, _.matchesProperty('name', capitalKeyword));
    if (isGenre) {
      params.genres.push(isGenre);
      console.info(`params genre: ${isGenre.name}`);
      continue;
    }

    // FIXME: Keyword library dosen't settle number as keyword from sentence
    // year
    // const re = /^(19|20)\d{2}$/;
    // var price = parseFloat(re.exec(keyword));
    // console.log(price);
    // console.info(`params keyword: ${keyword}`);

    const isCompany = detectCompany(keyword);
    yield console.log(isCompany);
  }

  // popularnosc
  // firma // request
  // Rok // bez
  // gatunek // bez
  // z obsada // potrzebny request
  // kraj // request
  // other // request
}

function rateKeywords(filters) {
  // Zaktualizowac wyniki 'przeszukiwania' na realne keywordsy
  const keywords = prepareSentence(filters.sentence);
  const params = settleParam(filters, keywords);

  const genreUpperLetter = _.upperFirst(filters.genre);
  const genreList = filters.genreList;
  const genreId = _.findIndex(genreList, ['name', genreUpperLetter]);
  const constructedGenre = genreList[genreId].id;

  return { constructedGenre, genreList };
}

function* constructUrl() {
  const randomNumber = randomizePage();
  const filters = yield select(selectFilters());
  const keywords = rateKeywords(filters);

  return `${url}/discover/movie?${apiKey}&with_genres=${keywords.constructedGenre}&page=${randomNumber}`;
}

export function* getRepos() {
  console.info('sagas run');
  // Select username from store
  const requestUrl = yield constructUrl();
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
