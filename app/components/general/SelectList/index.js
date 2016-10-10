/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import React, { PropTypes as ptype, Component } from 'react';

import Select from 'components/general/Select';

import styles from './styles.css';


/**
 * Default values for our item, we are set default values here in purpose.
 * to avoid unnecessary complex structure in our Class.
 */
const defaultValue = { name: '' };
const defaultOptions = { title: '', onChangeHandler: () => {} };


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
class SelectList extends Component {
  renderSelect = (item, index) => {
    const {
      value = defaultValue,
      list,
      options = defaultOptions } = item;

    const cs = styles.selectItem;
    return (
      <div key={index} className={cs}>
        <Select
          value={value}
          isLoading={list <= 0}
          options={list}
          onChange={options.onChangeHandler}
          title={options.title}
        />
      </div>
    );
  };

  render() {
    const { items } = this.props;

    const cs = styles.selectList;
    return (
      <div className={cs}>
        {items.map(this.renderSelect)}
      </div>
    );
  }
}

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
