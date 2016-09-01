/**
 *
 * Section
 *
 */

import React from 'react';

import styles from './styles.css';

function Section(props) {
  function renderTitle() {
    if (props.title) {
      return (
        <h1>{props.title}</h1>
      );
    }
    return null;
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
  children: React.PropTypes.object,
};

export default Section;
