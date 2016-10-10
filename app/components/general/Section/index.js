/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import React, { PropTypes as type } from 'react';
import classNames from 'classnames';

import { convertToPattern } from 'utils/hooks';
import Title from 'components/general/Title';

import styles from './styles.css';


/**
 * @desc Transform props.size into appropriate css class name.
 * props.size = '1/2' -> '1-of-2'
 */
const classSizePattern = convertToPattern(/\//, '-of-');


/**
 * Section
 * @desc allows us to create section with our custom Title and a size (css grid size) class name.
 * returns packed prop.children with title and appropriate grid size.
 */
function Section(props) {
  const {
    title,
    size,
    children,
    className = '',
    theme = 'light' } = props;

  let cssSize;
  if (size) cssSize = `--${classSizePattern(size)}`;

  const cs = classNames(styles.section, styles[cssSize], className);
  return (
    <section className={cs}>
      {title ? <Title text={title} theme={theme} /> : null}
      {children}
    </section>
  );
}

Section.propTypes = {
  title: type.string,
  theme: type.string,
  size: type.string,
  className: type.string,
  children: type.node.isRequired,
};

export default Section;
