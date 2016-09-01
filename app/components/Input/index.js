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

// TODO: Create requested title for input
function Input(props) {
  return (
    <div className={styles.input}>
      {inputHeading(props.title)}
      <input type={props.type || 'text'} placeholder={props.placeholder} onChange={props.onChangeHandler} value={props.value} {...props} />
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
