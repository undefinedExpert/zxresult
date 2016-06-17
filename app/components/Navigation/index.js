/**
*
* Navigation
*
*/

import React from 'react';

import styles from './styles.css';

class Navigation extends React.Component {
  render() {
    return (
      <div className={styles.navigation}>
        <div className="bar">
          <div className="bar__left">
            <h3>Logotyp qsfilm</h3>
          </div>
          <div className="bar__right">
            <ul>
              <li><a href="#">Log In |</a></li>
              <li><a href="#">Register</a></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Navigation;
