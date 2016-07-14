/**
 *
 * Navigation
 *
 */

import React from 'react';
import styles from './styles.css';
import classNames from 'classnames';

class Navigation extends React.Component {

  logotype() {
    if (this.props.logotype) {
      return (
        <div id="logotype" className={styles.logotype}>
          <h3>Logotyp</h3>
        </div>
      );
    }
    return null;
  }

  links() {
    return (
      <ul className={styles.links}>
        <li id="loginButton"><a href="#">Log In</a></li>
        <li id="registerButton"><a href="#">Register</a></li>
      </ul>
    );
  }

  render() {
    return (
      <div className={styles.navigation}>
        <div className={styles.bar}>
          <div className={classNames(styles.bar__item, styles['bar__item--left'])}>
            {this.logotype()}
          </div>
          <div className={classNames(styles.bar__item, styles['bar__item--right'])}>
            {this.links()}
          </div>
        </div>
      </div>
    );
  }
}

Navigation.propTypes = {
  logotype: React.PropTypes.func,
  filters: React.PropTypes.array,
  links: React.PropTypes.array,
};

export default Navigation;
