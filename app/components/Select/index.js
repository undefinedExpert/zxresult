/**
 *
 * Select
 *
 */

import React from 'react';
import ReactSelect from 'react-select';
import styles from './styles.css';
import Title from 'components/Title';

function Select(props) {
  const {
    value,
    loading,
    valueKey,
    labelKey,
    options,
    title,
  } = props;

  return (
    <div className={styles.select}>
      {title ? <Title text={title} /> : null}
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
  options: React.PropTypes.array,
  loading: React.PropTypes.func,
};
export default Select;
