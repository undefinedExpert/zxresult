import { take, call, select, put, cancel, fork, race } from 'redux-saga/effects';
import * as CONSTANT from 'containers/App/constants';
import { updateMovieResult, updateFilterGenre, updateFilters, analyseMovies } from 'containers/App/actions';
import { selectResult } from 'containers/App/selectors';
import { callToApi } from 'mechanisms/movieSearch';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import { orderBy } from 'lodash';

// Get movie
export function* getMovie() {
  const { data } = yield callToApi('/discover/movie');
  try {
    yield console.info('Result updated.');
    yield put(analyseMovies.request(data));
    // yield put(updateMovieResult.success(data, data.results[0]));
  }
  catch (err) {
    yield put(updateMovieResult.failure(err));
  }
}

// Individual exports for testing
export function* getGenreList() {
  const { data } = yield callToApi('/genre/movie/list', {}, false);
  try {
    yield put(updateFilterGenre.list.success(data.genres));
  }
  catch (err) {
    yield put(updateFilterGenre.list.failure(err));
  }
}

// Update filters have make a request to server
export function* getUpdateFilters() {
  const { data } = yield callToApi('/discover/movie', { page: 1000 });
  const totalPages = data.total_pages;
  const totalResults = data.total_results;
  try {
    console.log(`Total pages: ${totalPages}`);
    console.log(`Total Results: ${totalResults}`);
    yield put(updateFilters.success(totalPages, totalResults));
  }
  catch (err) {
    yield put(updateFilters.failure(err));
  }
}

export function* getAnalyseMovie() {
  yield console.log('siemanko');
  const { movies } = yield select(selectResult());
  // const sortedResults = movies.results.sort((itemA, itemB) => {
  //   return itemB.popularity - itemA.popularity;
  // });

  const sorted = movies.results.sort((itemA, itemB) => {
    const minimalVoteCount = 50;
    return (itemB.vote_count / (itemB.vote_count + minimalVoteCount) * itemB.vote_average + ( minimalVoteCount / (itemB.vote_count+ minimalVoteCount)) * 5) - (itemA.vote_count / (itemA.vote_count+ minimalVoteCount) * itemA.vote_average + (50 / (itemA.vote_count+50)) * 5)
  });

  // sorted.forEach((item) => {
  //   console.log(item.vote_count);
  //   console.log(item.vote_average);
  //   console.log('-----------------');
  // })

  // debugger;
  // TODO: next
  // jak wybrac najlepszy?
  try {
    yield put(updateMovieResult.success(sorted, sorted[0]));
  }
  catch (err) {
    yield put(updateMovieResult.failure(err));
  }
}

export function* getUpdateUrl() {
  // TODO: Refactor, turn it on
  yield put(push('/result'));
  // TEMPORARY OFF
}

/**
 * Watches for FILTER_FORM_UPDATE action and calls handler
 */
export function* getMovieWatcher() {
  while (yield take(CONSTANT.UPDATE_MOVIE_RESULT.REQUEST)) {
    yield call(getMovie);
  }
}

export function* getGenresListWatcher() {
  while (yield take(CONSTANT.UPDATE_FILTER_GENRE_LIST.REQUEST)) {
    yield call(getGenreList);
  }
}

export function* getResultChangeWatcher() {
  while (yield take(CONSTANT.UPDATE_MOVIE_RESULT.SUCCESS)) {
    yield call(getUpdateUrl);
  }
}

export function* getUpdateFiltersWatcher() {
  while (yield take(CONSTANT.UPDATE_FILTERS.REQUEST)) {
    yield call(getUpdateFilters);
  }
}

export function* getAnalyseMovieWatcher() {
  while (yield take(CONSTANT.ANALYSE_MOVIE.REQUEST)) {
    yield call(getAnalyseMovie);
  }
}

export function* getData() {
  // Fork watcher so we can continue execution
  const moviesWatcher = yield fork(getMovieWatcher);
  const updateUrl = yield fork(getResultChangeWatcher);
  const genreListWatcher = yield fork(getGenresListWatcher);
  const updateFilterWatcher = yield fork(getUpdateFiltersWatcher);
  const analyseMovieWatcher = yield fork(getAnalyseMovieWatcher);

  // Suspend execution until location changes
  // TODO: Change this to custom action, when the user request new 'result' or something like this.
  // The main reason of that is to not rely on LOCATION_CHANGE event because we 'actually' dose not change the location on the result sub-page
  // we just get new data.
  yield take(LOCATION_CHANGE);
  yield race([
    cancel(moviesWatcher),
    cancel(updateUrl),
    cancel(genreListWatcher),
    cancel(updateFilterWatcher),
    cancel(analyseMovieWatcher),
  ]);
}

/**
 * Root saga manages watcher lifecycle
 */

// Bootstrap sagas
export default [
  getData,
];
