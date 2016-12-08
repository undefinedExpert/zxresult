/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import className from 'classnames';
import React, { PropTypes as ptype } from 'react';

import Select from 'components/general/Select';

import styles from './styles.css';


/**
 * SelectList
 * @desc Renders multiple Select components from provided data.
 * Look at FilterForm Container if you need an example
 *
 * @return Select list, each rendered with their own data.
 */
const SelectList = ({ items, orientation }) => (
  <div className={className(styles.selectList, styles[orientation])}>
    {
      items.map((item, index) => (<Select key={index} {...item} />))
    }
  </div>
);

SelectList.propTypes = {
  items: ptype.array,
  orientation: ptype.string,
};

export default SelectList;
