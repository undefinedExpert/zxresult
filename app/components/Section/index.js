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
    className = '',
  } = props;
  // Transform string e.g 1/2 to --1-of-2 in condition to use appropriate css class
  const sectionSize = size ? `--${size.replace(/\//, '-of-')}` : null;
  const sectionClassNames = classNames(
    styles.section,
    styles[sectionSize],
    className,
  );
  return (
    <section className={sectionClassNames}>
      {title ? <Title text={title} theme="light" /> : null}
      {children}
    </section>
  );
}

Section.propTypes = {
  title: React.PropTypes.string,
  size: React.PropTypes.string,
  className: React.PropTypes.string,
  children: React.PropTypes.node.isRequired,
};

export default Section;
