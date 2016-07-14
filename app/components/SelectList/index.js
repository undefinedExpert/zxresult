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
    const { onChangeHandler } = this.props;
    return (
      <div key={index}>
        <Select
          value={item.active.name}
          key={index}
          isLoading={item.list <= 0}
          options={item.list}
          onChange={onChangeHandler}
        />
        <h2>Genre: {item.active.name}</h2>
      </div>
    );
  }
;
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
  value: React.PropTypes.string,
  options: React.PropTypes.array,
  loading: React.PropTypes.func,
  items: React.PropTypes.array,
  onChangeHandler: React.PropTypes.func,
};
export default SelectList;
