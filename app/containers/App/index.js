/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a neccessity for you then you can refactor it and remove
 * the linting exception.
 *
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */
import 'sanitize.css/sanitize.css';

import React, { Component } from 'react';

import Navigation from 'components/special/Navigation';

import styles from './styles.css'; // eslint-disable-line


export default class App extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={styles.app}>
        <Navigation logotype />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.node,
};
