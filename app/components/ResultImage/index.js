/**
*
* ResultImage
*
*/

import React from 'react';

import styles from './styles.css';

function ResultImage(props) {
  
  return (
    <div className={styles.resultImage}>
      <img src={props.path} alt={props.alt} />
    </div>
  );
}

export default ResultImage;
