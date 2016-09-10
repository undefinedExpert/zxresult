/**
 *
 * Input
 *
 */

import React from 'react';
import styles from './styles.css';
import Title from 'components/Title';

function Input(props) {
  return (
    <div className={styles.input}>
      {props.title ? <Title text={props.title} /> : null}
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
