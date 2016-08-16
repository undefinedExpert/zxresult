/**
*
* WelcomeText
*
*/

import React from 'react';

import styles from './styles.css';

function WelcomeText() {
  return (
    <div className={styles.welcomeText}>
      <h1>Hi, Are you looking for a movie?</h1>
      <h3>Let me inspire you then!</h3>
    </div>
  );
}

export default WelcomeText;
