import Navigation from '../index';

import { expect } from 'chai';
import { shallow, render, mount } from 'enzyme';
import React from 'react';

describe( '<Navigation />', () => {

  describe( 'bar__left', () => {
    
    it( 'Logotype element exist', () => {
      const renderedComponent = shallow( <Navigation /> );
      expect( renderedComponent.find( '#logotype' ) ).to.exist
    } );
  } );

  describe( 'bar__right', () => {

    it( 'Login link exist', () => {
      const renderedComponent = shallow( <Navigation /> );
      expect( renderedComponent.find( '#loginButton' ) ).to.exist
    } );

    it( 'Register link exist', () => {
      const renderedComponent = shallow( <Navigation /> );
      expect( renderedComponent.find( '#registerButton' ) ).to.exist
    } );

  } );

} );
