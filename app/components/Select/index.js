/**
*
* Select
*
*/

import React from 'react';
import ReactSelect from 'react-select';

import styles from './styles.css';


function inputHeading(title) {
  if (title) {
    return (
      <h6 className={styles.title}>{title}</h6>
    );
  }
  return false;
}

function Select(props) {
  console.log(props.value);
  return (
    <div className={styles.select}>
      {inputHeading(props.title)}
      <ReactSelect
        value={props.value || ''}
        isLoading={props.loading}
        valueKey={props.valueKey || 'name'}
        labelKey={props.labelKey || 'name'}
        autoload={false}
        options={props.options}
        {...props}
      />
    </div>
  );
}

Select.propTypes = {
  valueKey: React.PropTypes.string,
  labelKey: React.PropTypes.string,
  value: React.PropTypes.string,
  title: React.PropTypes.string,
  options: React.PropTypes.array.isRequired,
  loading: React.PropTypes.func,
};
export default Select;
