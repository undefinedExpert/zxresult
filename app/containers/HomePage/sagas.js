import { take, call, put, select } from 'redux-saga/effects';
import { MOOD_UPDATE } from 'containers/App/constants';
import { selectMood } from 'containers/App/selectors';
import request from 'utils/request';


// Individual exports for testing
export function* getRepos() {
  // Select username from store
  // const username = yield select(selectUsername());
  // const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;
  const username = yield select(selectMood());
  const requestURL = 'https://api.github.com/users/lanskey';

  const repos = yield call(request, requestURL);

  console.log(repos.data.avatar_url);
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
