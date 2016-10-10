/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import React, { PropTypes as ptype } from 'react';

import Title from 'components/general/Title';

import styles from './styles.css';


/**
 * Input
 * @desc Allows to control each input in the application, input is returned with Title if exist.
 * returns packed prop.children with title and appropriate grid size.
 */
function Input(props) {
  const {
    title,
    type = 'text',
    placeholder } = props;

  const cs = styles.input;
  return (
    <div className={cs}>
      {title ? <Title text={title} /> : null}
      <input type={type} placeholder={placeholder} {...props} />
    </div>
  );
}

Input.propTypes = {
  title: ptype.string.isRequired,
  placeholder: ptype.string.isRequired,
  type: ptype.string,
  value: ptype.string,
};

export default Input;
