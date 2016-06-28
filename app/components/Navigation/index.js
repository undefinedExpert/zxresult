/**
 *
 * Navigation
 *
 */

import React from 'react';
import styles from './styles.css';
import classNames from 'classnames';

function Navigation() {
  console.log(styles);
  return (
    <div className={styles.navigation}>
      <div className={styles.bar}>
        <div className={classNames(styles.bar__item, styles['bar__item--left'])}>
          <div id="logotype" className={styles.logotype}>
            <h3>Logotyp</h3>
          </div>
        </div>
        <div className={classNames(styles.bar__item, styles['bar__item--right'])}>
          <ul className={styles.links}>
            <li id="loginButton"><a href="#">Log In</a></li>
            <li id="registerButton"><a href="#">Register</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
