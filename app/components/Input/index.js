/**
*
* Input
*
*/

import React from 'react';
import styles from './styles.css';

function inputHeading(title) {
  if (title) {
    return (
      <h6 className={styles.title}>{title}</h6>
    );
  }
  return false;
}

function Input(props) {
  return (
    <div className={styles.input}>
      {inputHeading(props.title)}
      <input type={props.type || 'text'} placeholder={props.placeholder} {...props} />
    </div>
  );
}

Input.propTypes = {
  title: React.PropTypes.string.isRequired,
  placeholder: React.PropTypes.string.isRequired,
  type: React.PropTypes.string,
  value: React.PropTypes.string,
};

export default Input;
