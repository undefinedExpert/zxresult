import { take, call, select } from 'redux-saga/effects';
import { MOOD_UPDATE } from 'containers/App/constants';
import { selectGenre, selectGenreList } from 'containers/App/selectors';
// import request from 'utils/request';
import _ from 'lodash';

// Individual exports for testing
export function* getRepos() {
  // Select username from store
  const genre = yield select(selectGenre());
  const genreUpperLetter = _.upperFirst(genre);
  const genreList = yield select(selectGenreList());
  const genreId = _.findIndex(genreList, ['name', genreUpperLetter]);

  debugger;
  console.log(genreId);
  //
  const Url = 'http://api.themoviedb.org/3/discover/movie?api_key=9dee05d48efe51f51b15cc63b1fee3f5';
  const requestUrl = `${Url}&with_genres=${genreList[genreId].id}`;
  console.log(requestUrl);
  // // http://api.themoviedb.org/3/discover/movie?api_key=9dee05d48efe51f51b15cc63b1fee3f5&with_keywords=11828&with_genres=16
  //
  // const repos = yield call(request, requestURL);
  // // http://private-anon-e898af97d-themoviedb.apiary-mock.com/3/genre/movie/list
  // console.log(repos);
}

export function* sagaName() {
  while (yield take(MOOD_UPDATE)) {
    yield call(getRepos);
  }
}

// Your sagas for this container
export default [
  sagaName,
];
