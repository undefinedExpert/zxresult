/**
 *
 * Section
 *
 */

import React from 'react';
import Title from 'components/Title';

function Section(props) {
  return (
    <section {...props}>
      {props.title ? <Title text={props.title} /> : null}
      {props.children}
    </section>
  );
}

Section.propTypes = {
  title: React.PropTypes.string,
  children: React.PropTypes.node.isRequired,
};

export default Section;
