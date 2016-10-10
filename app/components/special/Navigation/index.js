/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import React, { PropTypes as ptype } from 'react';
import classNames from 'classnames';

import styles from './styles.css';

/**
 * Navigation
 * @desc Renders our app navigation.
 *
 * @method renderLogotype - Renders logotype (left side)
 * @method renderLinks - Render links (right side)
 * @method renderSide - Helper function to render each side of our bar
 * TODO: Refactor this method so it can work with multiple callbacks, it might be also worth to implement this as separated Component?
 * @method renderBar - Renders navigation with.
 *
 * TODO: Refactor Navigation Component
 */
class Navigation extends React.Component {
  renderLogotype = () => (
    <div id="logotype" className={styles.logotype}>
      <h3>Logotyp</h3>
    </div>
  );

  renderLinks = () => (
    <ul className={styles.links}>
      <li id="loginButton"><a href="#">Log In</a></li>
      <li id="registerButton"><a href="#">Register</a></li>
    </ul>
  );

  renderSide = (side, callback) => {
    const whichSide = `bar__item--${side}`;

    const cs = classNames(styles.bar__item, styles[whichSide]);
    return (
      <div className={cs}>
        {callback()}
      </div>
    );
  };

  renderBar = () => (
    <div className={styles.bar}>
      {this.renderSide('left', this.renderLogotype)}
      {this.renderSide('right', this.renderLinks)}
    </div>
  );

  render() {
    return (
      <div className={styles.navigation}>
        {this.renderBar()}
      </div>
    );
  }
}

Navigation.propTypes = {
  logotype: ptype.bool,
  filters: ptype.array,
  links: ptype.array,
};

export default Navigation;
