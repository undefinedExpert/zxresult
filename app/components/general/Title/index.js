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
 * Title
 * @desc Helps to render title for each Component which request it.
 * returns packed, ready to use Title Component.
 */
function Title(props) {
  const {
    theme,
    text,
    children } = props;

  const cs = classNames(styles.title, styles[`--${theme}`]);
  return (
    <h4 className={cs}>
      {text || children}
    </h4>
  );
}

Title.propTypes = {
  children: ptype.node,
  text: ptype.string,
  theme: ptype.string,
};

export default Title;
