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
        <div className={styles.bar}>
          <div className={styles['bar__item', 'bar__item--left']}>
            <div id="logotype">
              <h3>Logotyp</h3>
            </div>
          </div>
          <div className={styles['bar__item', 'bar__item--right']}>
            <ul>
              <li id="loginButton"><a href="#">Log In |</a></li>
              <li id="registerButton"><a href="#">Register</a></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Navigation;
