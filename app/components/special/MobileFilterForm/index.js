/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import React, { PropTypes as ptype } from 'react';

import styles from './styles.css';


/**
 * MobileFilterForm
 * @desc Renders FilterForm which adapts to the bottom of the mobile screen.
 */
const MobileFilterForm = ({ children, formHeight }) => (
  <div style={{ height: formHeight }} className={styles.mobileFilterForm}>
    {children}
  </div>
);

MobileFilterForm.propTypes = {
  children: ptype.node.isRequired,
  formHeight: ptype.number,
};

export default MobileFilterForm;
