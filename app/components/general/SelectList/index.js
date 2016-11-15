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
  /**
   * Default values for our item, we are set default values here in purpose.
   * to avoid unnecessary complex structure.
   */
  const defaultValue = { name: '' };
  const defaultOptions = { title: '', onChangeHandler: () => {}, isLoading: true };
  const {
    value = defaultValue,
    list,
    options = defaultOptions } = item;

  const cs = styles.selectItem;
  return (
    <div key={index} className={cs}>
      <Select
        value={value}
        isLoading={options.isLoading}
        options={list}
        onChange={options.onChangeHandler}
        title={options.title}
      />
    </div>
  );
};


/**
 * renderSelects
 * @desc Map Single Select
 * @param items - Set of Select data.
 */
function renderSelects(items) {
  return items.map((item, index) => renderSelect(item, index));
}

/**
 * SelectList
 * @desc Renders multiple Select components from provided data.
 * Look at MovieSearchForm Container if you need an example
 *
 * returns Select list, each rendered with their own data.
 *
 * @method renderSelect - Renders single Select component from data, handles map function.
 * We are also preparing our Select Component with default data, if they are not provided.
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
  options: ptype.array,
  loading: ptype.func,
  items: ptype.array.isRequired,
  onChangeHandler: ptype.func,
};

export default SelectList;
