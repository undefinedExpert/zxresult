/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import React, { PropTypes as ptype } from 'react';
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
    theme = 'light',
    type = 'section' } = props;

  let cssSize;
  if (size) cssSize = `--${classSizePattern(size)}`;

  // Allow us use custom tags
  // like: section, article, div - basing on current semantic need
  const CustomTag = type;

  const cs = classNames(styles.section, styles[cssSize], className);
  return (
    <CustomTag className={cs}>
      {title ? <Title text={title} theme={theme} /> : null}
      {children}
    </CustomTag>
  );
}

Section.propTypes = {
  type: ptype.string,
  title: ptype.string,
  theme: ptype.string,
  size: ptype.string,
  className: ptype.string,
  children: ptype.node.isRequired,
};

export default Section;
