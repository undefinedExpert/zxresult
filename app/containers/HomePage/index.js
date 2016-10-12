/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import React, { Component } from 'react';

import FilterForm from 'containers/FilterForm';
import WelcomeText from 'components/special/WelcomeText';


/**
 * HomePage
 * @desc User landing page.
 */
class HomePage extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <WelcomeText />
        <FilterForm />
      </div>
    );
  }
}

HomePage.propTypes = {};

export default HomePage;
