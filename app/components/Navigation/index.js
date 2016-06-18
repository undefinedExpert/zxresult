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
            <div className="left__item left__item--logo">
              <h3>Logotyp qsfilm</h3>
            </div>
          </div>
          <div className="bar__right">
            <ul>
              <li className="right__item right__item--login"><a id="loginButton" href="#">Log In |</a></li>
              <li className="right__item right__item--register"><a id="registerButton" href="#">Register</a></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Navigation;
