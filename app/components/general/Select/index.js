/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import classNames from 'classnames';
import ReactSelect from 'react-select';
import 'react-select/dist/react-select.css';
import React, { PropTypes as ptype } from 'react';

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
    theme,
    value = { name: '' },
    valueKey = 'name',
    labelKey = 'name',
    title,
    className,
  } = props;

  const cs = classNames(styles.select, styles[theme], className);
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
  theme: ptype.string,
  valueKey: ptype.string,
  labelKey: ptype.string,
  className: ptype.string,
  value: ptype.oneOfType([
    ptype.string,
    ptype.object,
  ]),
  title: ptype.string,
};

export default Select;
