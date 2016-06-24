/*
 *
 * Form
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectForm from './selectors';

export class Form extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
      This is Form container !
      </div>
    );
  }
}

const mapStateToProps = selectForm();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Form);
