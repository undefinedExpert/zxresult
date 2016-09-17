/**
 *
 * Button
 *
 */

import React from 'react';
import styles from './styles.css';
import classNames from 'classnames';

function Button(props) {
  return (
    <div>
      <button onClick={props.handleRoute} className={classNames('btn', 'btn-primary', styles.button)} type={props.type} {...props}> {props.children}
      </button>
    </div>
  );
}

Button.propTypes = {
  type: React.PropTypes.string,
  isLoading: React.PropTypes.bool,
  children: React.PropTypes.node.isRequired,
  handleRoute: React.PropTypes.func,
};

export default Button;
