/**
 *
 * Select
 *
 */

import React from 'react';
import ReactSelect from 'react-select';

import styles from './styles.css';

function Select(props) {
  const {
    value,
    loading,
    valueKey,
    labelKey,
    options,
    title,
  } = props;

  function inputHeading() {
    return (
      <h6 className={styles.title}>{title}</h6>
    );
  }

  return (
    <div className={styles.select}>
      {props.title ? inputHeading() : null}
      <ReactSelect
        value={value || ''}
        isLoading={loading}
        valueKey={valueKey || 'name'}
        labelKey={labelKey || 'name'}
        autoload={false}
        options={options}
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
