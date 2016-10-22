// import { MovieSearchForm } from '../index';
// import SelectList from 'components/SelectList';
//
// import { expect } from 'chai';
// import { shallow } from 'enzyme';
// import React from 'react';
// // mapStateToProps - https://github.com/reactjs/redux/issues/1534
// describe('<Movie-search-form />', () => {
//   let renderComponent;
//   const props = {
//     filters: {
//       sentence: 'ohio',
//       trend: {
//         active: {
//           id: 28,
//           name: 'Classical',
//         },
//         list: [
//           {
//             id: 28,
//             name: 'Classical',
//           },
//           {
//             id: 28,
//             name: 'Popular',
//           },
//           {
//             id: 28,
//             name: 'Classical',
//           },
//         ],
//       },
//       decade: {
//         active: {
//           name: '2000s',
//           id: 2000,
//         },
//         list: [
//           {
//             name: '2000s',
//             id: 2000,
//           },
//           {
//             name: '1990s',
//             id: 1990,
//           },
//           {
//             name: '1980s',
//             id: 1980,
//           },
//           {
//             name: '1970s',
//             id: 1970,
//           },
//         ],
//       },
//       genre: {
//         active: {
//           id: 28,
//           name: 'Action',
//         },
//         list: [],
//       },
//     },
//     getGenreList: () => {},
//     getUpdateFilters: () => {},
//   };
//   beforeEach(() => {
//     renderComponent = shallow(<MovieSearchForm {...props} />, {});
//   });
//
//   it('It should contain SelectList Component', () => {
//     const expected = renderComponent.containsMatchingElement(<SelectList />);
//     expect(expected).to.eql(true);
//   });
//
//   // It should render decade, sentence, type select inputs
//   // It should render search button
// });
//
