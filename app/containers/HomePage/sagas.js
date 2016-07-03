import { take, call, select, put } from 'redux-saga/effects';
import { MOOD_UPDATE, GENRE_UPDATE, FILTER_FORM_UPDATE} from 'containers/App/constants';
import { selectGenre, selectGenreList } from 'containers/App/selectors';
import { resultSet } from 'containers/App/actions';
import request from 'utils/request';
import _ from 'lodash';
import Chance from 'chance';
import retext from 'retext';
import nlcstToString from 'nlcst-to-string';
import pos from 'pos';

console.log(pos);
// import keywords from 'retext-keywords';
//
// // var retext = require('retext');
// // var nlcstToString = require('nlcst-to-string');
// // var keywords = require('retext-keywords');
//
// console.log(keywords);
// Individual exports for testing
export function* getRepos() {
  console.log(retext);
  // Select username from store
  const chance = new Chance();
  const genre = yield select(selectGenre());
  const genreUpperLetter = _.upperFirst(genre);
  const genreList = yield select(selectGenreList());
  const genreId = _.findIndex(genreList, ['name', genreUpperLetter]);

  if (genreId === -1) return console.warn(`Genre "${genre}" wasn't found in genreList`);

  const randomNumber = chance.integer({ min: 0, max: 250 });


  const Url = 'http://api.themoviedb.org/3/discover/movie?api_key=9dee05d48efe51f51b15cc63b1fee3f5';
  // console.log(genreId);
  const requestUrl = `${Url}&with_genres=${genreList[genreId].id}&page=${randomNumber}`;
  const movies = yield call(request, requestUrl);

  console.log(randomNumber);

  if (!movies.err) {
    yield put(resultSet(movies.data, movies.data.results[0]));
  }
}

export function* sagaName() {
  while (yield take(FILTER_FORM_UPDATE)) {
    yield call(getRepos);
  }
}

// Your sagas for this container
export default [
  sagaName,
];
