// /**
//  *  Components are imported in specific (scope based) order:
//  *  1. Node_modules
//  *  2. Application
//  *  3. Module
//  */
//
// import { expect } from 'chai';
//
// import * as CONSTANT from './../constants';
//
// import {
//   updateFilterGenre,
//   updateMovieResult,
//   updateFilterDecade,
//   updateFilterTrend,
//   updateUrl,
//   updateFilters,
// } from '../actions';
//
// describe('Application actions', () => {
//   describe('updateFilterGenre()', () => {
//     let value;
//     let response;
//     let error;
//     beforeEach(() => {
//       value = 'value';
//       response = 'response';
//       error = 'error';
//     });
//
//     it('Should call actions from genreActive - requested, succeed, failed', () => {
//       const expected = {
//         request: {
//           type: CONSTANT.FILTER_GENRE.REQUEST,
//           value,
//         },
//         success: {
//           type: CONSTANT.FILTER_GENRE.SUCCESS,
//           value,
//           response,
//         },
//         failure: {
//           type: CONSTANT.FILTER_GENRE.FAILURE,
//           value,
//           error,
//         },
//       };
//
//       expect(updateFilterGenre.active.request(value)).to.eql(expected.request);
//       expect(updateFilterGenre.active.success(value, response)).to.eql(expected.success);
//       expect(updateFilterGenre.active.failure(value, error)).to.eql(expected.failure);
//     });
//
//     it('Should call actions from genreList - requested, succeed, failed', () => {
//       const expected = {
//         request: {
//           type: CONSTANT.FILTER_GENRE_LIST.REQUEST,
//         },
//         success: {
//           type: CONSTANT.FILTER_GENRE_LIST.SUCCESS,
//           value,
//           response,
//         },
//         failure: {
//           type: CONSTANT.FILTER_GENRE_LIST.FAILURE,
//           value,
//           error,
//         },
//       };
//
//       expect(updateFilterGenre.list.request()).to.eql(expected.request);
//       expect(updateFilterGenre.list.success(value, response)).to.eql(expected.success);
//       expect(updateFilterGenre.list.failure(value, error)).to.eql(expected.failure);
//     });
//   });
// });
