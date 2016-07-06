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
import keywords from 'retext-keywords';


//
// // var retext = require('retext');
// // var nlcstToString = require('nlcst-to-string');
// // var keywords = require('retext-keywords');
//
// console.log(keywords);
// Individual exports for testing
export function* getRepos() {
  // Select username from store
  const chance = new Chance();
  const filters = yield select(selectFilters());

  const genreUpperLetter = _.upperFirst(filters.genre);
  const genreList = yield filters.genreList;
  const genreId = _.findIndex(genreList, ['name', genreUpperLetter]);

  const randomNumber = chance.integer({ min: 0, max: 250 });


  //
  const Url = 'http://api.themoviedb.org/3/discover/movie?api_key=9dee05d48efe51f51b15cc63b1fee3f5';
  // console.log(genreId);
  const requestUrl = `${Url}&with_genres=${genreList[genreId].id}&page=${randomNumber}`;
  const movies = yield call(request, requestUrl);
  // const movies = {};

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
// export function* githubData() {
//   // Fork watcher so we can continue execution
//   const watcher = yield fork(getReposWatcher);
//
//   // Suspend execution until location changes
//   yield take(LOCATION_CHANGE);
//   yield cancel(watcher);
// }

// Bootstrap sagas
export default [
  getReposWatcher,
];
