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
      <h1>Look for mobie</h1>
      <h3>What type of movie you're looking for? Sad, emotional, funny?</h3>
    </div>
  );
}

export default WelcomeText;
