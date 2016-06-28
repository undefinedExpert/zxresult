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
    <button onClick={props.handleRoute} className={classNames('btn', 'btn-primary', styles.button)} type={props.type}> {props.children}
    </button>
  );
}

Button.propTypes = {
  type: React.PropTypes.string,
  children: React.PropTypes.node.isRequired,
  onClick: React.PropTypes.func,
};

export default Button;
