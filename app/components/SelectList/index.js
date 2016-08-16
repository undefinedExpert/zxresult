/**
 *
 * SelectList
 *
 */

import React from 'react';

import styles from './styles.css';
import Select from 'components/Select';

class SelectList extends React.Component {
  renderSelect = (item, index) => {
    const { } = this.props;
    console.log(item.value);
    const value = item.value === null ? '' : item.value.name;
    const list = item.list;
    const changeHandler = item.options === {} ? '' : item.options.onChangeHandler;
    const title = item.options.hasOwnProperty('title') ? item.options.title : '';

    return (
      <div key={index}>
        <Select
          value={value}
          key={index}
          isLoading={list <= 0}
          options={list}
          onChange={changeHandler}
          title={title}
          {...this.props}
        />
      </div>
    );
  };
  render() {
    const {
      items,
    } = this.props;

    return (
      <div className={styles.selectList}>
        {items.map(this.renderSelect)}
      </div>
    );
  }
}

SelectList.propTypes = {
  valueKey: React.PropTypes.string,
  labelKey: React.PropTypes.string,
  title: React.PropTypes.string,
  value: React.PropTypes.string,
  options: React.PropTypes.array,
  loading: React.PropTypes.func,
  items: React.PropTypes.array,
  onChangeHandler: React.PropTypes.func,
};

export default SelectList;
