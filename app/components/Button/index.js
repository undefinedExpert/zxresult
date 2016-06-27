/**
 *
 * Button
 *
 */

import React from 'react';
import classNames from 'classnames';
import styles from './styles.css';

function Button(props) {
  return (
    <button className={classNames('btn', 'btn-primary', styles.button)} type={props.type}> {props.children}
    </button>
  );
}

Button.propTypes = {
  type: React.PropTypes.string,
};

export default Button;
