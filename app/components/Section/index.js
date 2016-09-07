/**
 *
 * Section
 *
 */

import React from 'react';

import styles from './styles.css';

function Section(props) {
  function renderTitle() {
    return (
      <h4 className={styles.title}>{props.title}</h4>
    );
  }

  return (
    <section {...props}>
      {props.title ? renderTitle() : null}
      {props.children}
    </section>
  );
}

Section.propTypes = {
  title: React.PropTypes.string,
  children: React.PropTypes.node.isRequired,
};

export default Section;
