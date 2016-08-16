/**
*
* Input
*
*/

import React from 'react';

import styles from './styles.css';


// TODO: Create title heading component
function inputHeading(title) {
  if (title) {
    return (
      <h6 className={styles.title}>{title}</h6>
    );
  }
  return false;
}

function Input() {
  return (
    <div className={styles.input}>
      {inputHeading('SENTENCE')}
      <input type="text" placeholder="ohio" />
    </div>
  );
}

export default Input;
