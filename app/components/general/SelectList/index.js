/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import React, { PropTypes as ptype } from 'react';

import Select from 'components/general/Select';

import styles from './styles.css';


/**
 * renderSelect
 * @desc Render Single Select Component, based on it's props.
 * @param item - Data for our select field
 * @param index - Used as React key
 */
const renderSelect = (item, index) => {
  const cs = styles.selectItem;
  return (
    <div key={index} className={cs}>
      <Select {...item} />
    </div>
  );
};


/**
 * renderSelects
 * @desc Map Single Select
 * @param items - Set of Select data.
 */
const renderSelects = (items) => items.map((item, index) => renderSelect(item, index));


/**
 * SelectList
 * @desc Renders multiple Select components from provided data.
 * Look at FilterForm Container if you need an example
 *
 * @return Select list, each rendered with their own data.
 */
const SelectList = ({ items }) => {
  const cs = styles.selectList;
  return (
    <div className={cs}>
      {renderSelects(items)}
    </div>
  );
};

SelectList.propTypes = {
  title: ptype.string,
  value: ptype.oneOfType([
    ptype.string,
    ptype.object,
  ]),
  settings: ptype.object,
  options: ptype.array,
  loading: ptype.func,
  items: ptype.array.isRequired,
  onChangeHandler: ptype.func,
};

export default SelectList;
