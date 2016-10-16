// import { fromJS } from 'immutable';
// import { expect } from 'chai';
//
// import {
//   selectLocationState,
//   globalDomain,
//   filtersDomain,
//   selectFilters,
//   userDomain,
//   selectUser,
//   resultDomain,
//   selectResult,
// } from 'containers/App/selectors';
//
// describe('Location', () => {
//   it('should select route as a plain JS object', () => {
//     const route = fromJS({
//       locationBeforeTransitions: null,
//     });
//     const mockedState = fromJS({
//       route,
//     });
//     expect(selectLocationState()(mockedState)).to.eql(route.toJS());
//   });
// });
//
// describe('Global', () => {
//   const globalSelector = globalDomain();
//   it('Should select global', () => {
//     const globalState = fromJS({
//       data: {},
//     });
//     const mockedState = fromJS({
//       global: globalState,
//     });
//     expect(globalSelector(mockedState)).to.eql(globalState);
//   });
// });
//
// describe('Filters', () => {
//   it('filtersDomain()', () => {
//     const filterSelector = filtersDomain();
//     const filterState = {
//       data: {},
//     };
//     const mockedState = fromJS({
//       global: fromJS({
//         filters: fromJS(filterState),
//       }),
//     });
//     expect(filterSelector(mockedState)).to.eql(filterState);
//   });
//
//   it('selectFilters()', () => {
//     const filterSelector = selectFilters();
//     const filterState = {
//       genre: {},
//       decade: {},
//       trend: {},
//     };
//     const mockedState = fromJS({
//       global: fromJS({
//         filters: fromJS(filterState),
//       }),
//     });
//     expect(filterSelector(mockedState)).to.eql(filterState);
//   });
// });
//
// describe('User', () => {
//   it('userDomain()', () => {
//     const userSelector = userDomain();
//     const userState = {
//       data: {},
//     };
//     const mockedState = fromJS({
//       global: fromJS({
//         user: fromJS(userState),
//       }),
//     });
//     expect(userSelector(mockedState)).to.eql(userState);
//   });
//
//   it('selectUser()', () => {
//     const userSelector = selectUser();
//     const userState = {
//       username: 'test',
//     };
//     const mockedState = fromJS({
//       global: fromJS({
//         user: fromJS(userState),
//       }),
//     });
//     expect(userSelector(mockedState)).to.eql(userState);
//   });
// });
//
// describe('Result', () => {
//   it('resultDomain()', () => {
//     const resultSelector = resultDomain();
//     const resultState = {
//       data: {},
//     };
//     const mockedState = fromJS({
//       global: fromJS({
//         result: fromJS(resultState),
//       }),
//     });
//     expect(resultSelector(mockedState)).to.eql(resultState);
//   });
//
//   it('selectResult()', () => {
//     const resultSelector = selectResult();
//     const resultState = {
//       movie: {},
//       movies: {},
//       isFetching: false,
//       resultsRange: 5,
//     };
//     const mockedState = fromJS({
//       global: fromJS({
//         result: fromJS(resultState),
//       }),
//     });
//     expect(resultSelector(mockedState)).to.eql(resultState);
//   });
// });
//
