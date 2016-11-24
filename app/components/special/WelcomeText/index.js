/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */
import React from 'react';

import styles from './styles.css';


/**
 * WelcomeText
 * @desc Welcomes user with cool intro message.
 * TODO: Make it more interesting or sexy.
 */
function WelcomeText() {
  const msg = {
    greeting: 'Hi,',
    heading: 'looking for a movie?',
    subHeading: 'Let me inspire you then!',
  };

  return (
    <div className={styles.welcomeText}>
      <h1>{msg.greeting} <b>{msg.heading}</b></h1>
      <h3>{msg.subHeading}</h3>
    </div>
  );
}

export default WelcomeText;
