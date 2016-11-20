/**
*  Components are imported in specific (scope based) order:
*  1. Node_modules
*  2. Application
*  3. Module
*/

import React from 'react';

import styles from './styles.css';


/**
* LoadingIndicator
* @desc TODO: desc for LoadingIndicator
*/
const LoadingIndicator = () => {
  const cs = styles.ball;
  return (
    <div className={cs}></div>
  );
};

LoadingIndicator.propTypes = {};

export default LoadingIndicator;
