// import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
// import { selectMood } from 'containers/App/selectors';
// import { MOOD_UPDATE } from 'containers/App/constants';
// import { LOCATION_CHANGE } from 'react-router-redux';
//
// // Individual exports for testing
// export function* getMovie() {
//   // Select username from store
//   console.log(selectMood);
// }
//
// /**
//  * Watches for LOAD_REPOS action and calls handler
//  */
// export function* getReposWatcher() {
//   while (yield take(MOOD_UPDATE)) {
//     yield call(getMovie);
//   }
// }
// export function* githubData() {
//   // Fork watcher so we can continue execution
//   const watcher = yield fork(getReposWatcher);
//
//   // Suspend execution until location changes
//   yield take(LOCATION_CHANGE);
//   yield cancel(watcher);
// }
//
// // All sagas to be loaded
// export default [
//   githubData,
// ];
