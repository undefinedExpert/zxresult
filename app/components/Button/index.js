/**
 *
 * Button
 *
 */

import React from 'react';
import classNames from 'classnames';
import styles from './styles.css';


function isLoadingRender(boolean) {
  if (boolean) {
    return (
      <h6 className={styles.title}>Loading ***</h6>
    );
  }
  return false;
}


function Button(props) {;
  return (
    <div>
      {isLoadingRender(props.isLoading)}
      <button onClick={props.handleRoute} className={classNames('btn', 'btn-primary', styles.button)} type={props.type} {...props}> {props.children}
      </button>
    </div>
  );
}

Button.propTypes = {
  type: React.PropTypes.string,
  isLoading: React.PropTypes.bool,
  children: React.PropTypes.node.isRequired,
  onClick: React.PropTypes.func,
  handleRoute: React.PropTypes.func,
};

export default Button;
