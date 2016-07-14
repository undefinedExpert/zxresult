/*
 *
 * BottomNavigation
 *
 */

import React from 'react';
import { connect } from 'react-redux';

export class BottomNavigation extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
      This is BottomNavigation container !
      </div>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapDispatchToProps)(BottomNavigation);
