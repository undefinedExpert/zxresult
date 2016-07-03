import { take, call, select, put } from 'redux-saga/effects';
import { MOOD_UPDATE, GENRE_UPDATE} from 'containers/App/constants';
import { selectGenre, selectGenreList } from 'containers/App/selectors';
import { resultSet } from 'containers/App/actions';
import request from 'utils/request';
import _ from 'lodash';
import Chance from 'chance';

// Individual exports for testing
export function* getRepos() {
  // Select username from store
  var chance = new Chance();
  const genre = yield select(selectGenre());
  const genreUpperLetter = _.upperFirst(genre);
  const genreList = yield select(selectGenreList());
  const genreId = _.findIndex(genreList, ['name', genreUpperLetter]);
  const randomNumber = chance.integer({ min: 0, max: 250 });

  // const number = chance.integer({min: 0, max: 250});
  // Jakie zapytanie powinnienm skonstruowac aby otrzymac swoj wynik?
  // - Musi to byc wynik zgodnie ze wskazówkami
  // - Musi Wynik musi byc zaokraglony do 5 najlepszych wynikow
  // -
  const Url = 'http://api.themoviedb.org/3/discover/movie?api_key=9dee05d48efe51f51b15cc63b1fee3f5';
  const requestUrl = `${Url}&with_genres=${genreList[genreId].id}&page=${randomNumber}`;

  const movies = yield call(request, requestUrl);

  console.log(randomNumber);

  if (!movies.err) {
    yield put(resultSet(movies.data, movies.data.results[0]));
  }
}

export function* sagaName() {
  while (yield take(GENRE_UPDATE)) {
    yield call(getRepos);
  }
}

// Your sagas for this container
export default [
  sagaName,
];
