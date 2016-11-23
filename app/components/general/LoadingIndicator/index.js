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
* LoadingIndicator
* @desc TODO: desc for LoadingIndicator
*/
const LoadingIndicator = ({ isDisabled }) => {
  const cs = classNames(
    styles.ball,
    isDisabled ? styles.isDisabled : null,
  );
  return (
    <div className={cs}></div>
  );
};

LoadingIndicator.propTypes = {
  isDisabled: ptype.bool,
};

export default LoadingIndicator;
