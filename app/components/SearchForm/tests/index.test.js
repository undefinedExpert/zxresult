import SearchForm from '../index';

import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';

describe( '<SearchForm />', () => {
  let component;
  beforeEach( () => {
    component = shallow( <SearchForm /> );

    console.log( component.find( '#feeling' ).length );
    console.log( '----------------------------------' );

    component.find( '#feeling' ).simulate( 'change', 'sad' );
  } );

  it( 'Shows text in select input', () => {
    expect( component.find( '#feeling' ) ).toExist();
  } );

} );
//
// it('Logotype element exist', () => {
//   const renderedComponent = shallow(<Navigation />);
//   expect(renderedComponent.find('#logotype').length).toEqual(1);
// });

// describe('SearchBar', () => {
//   let component;
//
//   describe('Entering search text', () => {
//     beforeEach(() => {
//       component = renderComponent(SearchBar);
//       component.find('.search-bar').simulate('change', 'search value');
//     });
//
//     it('Shows text in search input', () => {
//       expect(component.find('.search-bar')).to.have.value('search value');
//     });
//   });
//
// });