/**
*  Components are imported in specific (scope based) order:
*  1. Node_modules
*  2. Application
*  3. Module
*/

import React from 'react';

import styles from './styles.css';


/**
* Image
* @desc TODO: desc for Image
*/
function Image() {
  return (
    <div className={styles.image}>
    </div>
  );
}

Image.propTypes = {};

export default Image;
