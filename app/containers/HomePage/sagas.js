import { take, call, select, put } from 'redux-saga/effects';
import { FILTER_FORM_UPDATE } from 'containers/App/constants';
import { selectGenre, selectGenreList } from 'containers/App/selectors';
import { resultSet } from 'containers/App/actions';
import request from 'utils/request';
import _ from 'lodash';
import Chance from 'chance';
// import retext from 'retext';
// import nlcstToString from 'nlcst-to-string';
// import keywords from 'retext-keywords';
// Individual exports for testing
export function* getRepos() {
  // Select username from store
  const chance = new Chance();
  const genre = yield select(selectGenre());
  const genreUpperLetter = _.upperFirst(genre);
  const genreList = yield select(selectGenreList());
  const genreId = _.findIndex(genreList, ['name', genreUpperLetter]);

  // Is the typed genre is inside of our genre list?
  if (genreId === -1) {
    console.warn(`Genre "${genre}" wasn't found in genreList`);
    return;
  }

  const randomNumber = chance.integer({ min: 0, max: 250 });


  const Url = 'http://api.themoviedb.org/3/discover/movie?api_key=9dee05d48efe51f51b15cc63b1fee3f5';
  // console.log(genreId);
  const requestUrl = `${Url}&with_genres=${genreList[genreId].id}&page=${randomNumber}`;
  const movies = yield call(request, requestUrl);
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
