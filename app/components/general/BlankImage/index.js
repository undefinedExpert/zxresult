/**
*  Components are imported in specific (scope based) order:
*  1. Node_modules
*  2. Application
*  3. Module
*/

import { IoImage } from 'react-icons/lib/io/';
import React from 'react';

import styles from './styles.css';


/**
* BlankImage
* @desc TODO: desc for BlankImage
*/
function BlankImage() {
  return (
    <div className={styles.blankImage}>
      <IoImage size={32} />
    </div>
  );
}

BlankImage.propTypes = {};

export default BlankImage;
