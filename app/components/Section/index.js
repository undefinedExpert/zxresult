/**
 *
 * Section
 *
 */

import React from 'react';
import Title from 'components/Title';
import styles from './styles.css';
import classNames from 'classnames';

function Section(props) {
  const {
    title,
    size,
    children,
  } = props;
  const sectionSize = size ? `--${size.replace(/\//, '-of-')}` : null;
  console.log(sectionSize);
  return (
    <section className={classNames(styles.section, styles[sectionSize])}>
      {title ? <Title text={title} theme="light" /> : null}
      {children}
    </section>
  );
}

Section.propTypes = {
  title: React.PropTypes.string,
  children: React.PropTypes.node.isRequired,
};

export default Section;
