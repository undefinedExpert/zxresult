/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import React, { PropTypes as ptype } from 'react';
import ReactSelect from 'react-select';

import Title from 'components/general/Title';

import styles from './styles.css';


/**
 * Select
 * @desc Wraps 3rd party ReactSelect Component in case we would like to remove it someday from app.
 * We also set some default values if no one is provided
 *
 * returns Return select field with title (if set).
 */
function Select(props) {
  const {
    value = '',
    valueKey = 'name',
    labelKey = 'name',
    title } = props;

  const cs = styles.select;
  return (
    <div className={cs}>
      {title ? <Title text={title} /> : null}
      <ReactSelect
        value={value}
        valueKey={valueKey}
        labelKey={labelKey}
        autoload={false}
        {...props}
      />
    </div>
  );
}

Select.propTypes = {
  valueKey: ptype.string,
  labelKey: ptype.string,
  value: ptype.oneOfType([
    ptype.string,
    ptype.object,
  ]),
  title: ptype.string,
  options: ptype.array.isRequired,
  loading: ptype.func,
};

export default Select;
