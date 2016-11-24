/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import React, { Component } from 'react';
import { Swipe, SwipeItem } from 'swipejs/react';

// import FilterForm from 'containers/FilterForm';
// import WelcomeText from 'components/special/WelcomeText';
import SwipeBlock from 'components/general/SwipeBlock';

import styles from './styles.css';


/**
 * HomePage
 * @desc User landing page.
 */
class HomePage extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={styles.homepage}>
        <SwipeBlock>
          <img src="http://placehold.it/1000x400&text=slide3" />
          <img src="http://placehold.it/1000x400&text=slide4" />
          <img src="http://placehold.it/1000x400&text=slide5" />
        </SwipeBlock>
      </div>
    );
  }
}

HomePage.propTypes = {};

export default HomePage;
