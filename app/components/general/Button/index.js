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
 * Button
 * @desc Default component for each button in app.
 * returns prepared button.
 */
function Button(props) {
  const {
    children,
    className,
    ...rest } = props;

  const cs = classNames(
    styles.button,
    className
  );
  return (
    <button className={cs} {...rest}>
      <div className={styles.children}>
        {children}
      </div>
    </button>
  );
}

Button.propTypes = {
  type: ptype.string,
  className: ptype.string,
  isLoading: ptype.bool,
  children: ptype.oneOfType([
    ptype.arrayOf(ptype.node),
    ptype.node,
  ]),
  handleRoute: ptype.func,
};

export default Button;
