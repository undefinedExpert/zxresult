/**
*
* SelectList
*
*/

import React from 'react';

import styles from './styles.css';


class SelectList extends React.Component {
  render() {
    const {
      items, renderHandler,
    } = this.props;

    return (
      <div className={styles.selectList}>
        {items.map(renderHandler)}
      </div>
    );
  }
}

SelectList.propTypes = {
  items: React.PropTypes.array,
  onChangeHandler: React.PropTypes.func,
  renderHandler: React.PropTypes.func,
};
export default SelectList;
