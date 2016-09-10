/**
*
* Title
*
*/

import React from 'react';

import styles from './styles.css';

function Title(props) {
  return (
    <h4 className={styles.title}>{props.text ? props.text : props.children}</h4>
  );
}

Title.propTypes = {
  children: React.PropTypes.node.isRequired,
  text: React.PropTypes.string,
};

export default Title;
