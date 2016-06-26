/*
 *
 * HomePage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { selectHomePage } from './selectors';
import { createStructuredSelector } from 'reselect';

export class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        This is HomePage container !
        <h1>{this.props.repos}</h1>
      </div>
    );
  }
}


const mapStateToProps = createStructuredSelector({
  repos: selectHomePage(),
});


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
