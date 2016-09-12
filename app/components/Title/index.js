/**
 *
 * Title
 *
 */

import React from 'react';
import classNames from 'classnames';
import styles from './styles.css';

function Title(props) {
  const className = props.theme === 'light' ? classNames(styles.title, styles['--light']) : styles.title;
  return (
    <h4 className={className}>
      {props.text ? props.text : props.children}
    </h4>
  );
}

Title.propTypes = {
  children: React.PropTypes.node,
  text: React.PropTypes.string,
  theme: React.PropTypes.string,
};

export default Title;
