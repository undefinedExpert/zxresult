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
      <h1>{props.title}</h1>
    );
  }

  return (
    <div className={styles.section}>
      <section {...props}>
        {props.title ? renderTitle() : null}
        {props.children}
      </section>
    </div>
  );
}

Section.propTypes = {
  title: React.PropTypes.string,
  children: React.PropTypes.node.isRequired,
};

export default Section;
