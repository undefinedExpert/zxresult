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
    handleRoute,
    type,
    children } = props;

  const cs = classNames('btn', 'btn-primary', styles.button);
  return (
    <button onClick={handleRoute} className={cs} type={type} {...props}>
      {children}
    </button>
  );
}

Button.propTypes = {
  type: ptype.string,
  isLoading: ptype.bool,
  children: ptype.node.isRequired,
  handleRoute: ptype.func,
};

export default Button;
