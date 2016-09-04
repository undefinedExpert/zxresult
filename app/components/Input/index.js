/**
 *
 * Input
 *
 */

import React from 'react';
import styles from './styles.css';

function Input(props) {
  function inputHeading() {
    return (
      <h6 className={styles.title}>{props.title}</h6>
    );
  }

  return (
    <div className={styles.input}>
      {props.title ? inputHeading() : null}
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
