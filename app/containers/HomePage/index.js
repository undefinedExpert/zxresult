/*
 *
 * HomePage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import MovieSearchForm from 'containers/MovieSearchForm';
import WelcomeText from 'components/special/WelcomeText';

export class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <WelcomeText />
        <MovieSearchForm />
        {this.props.children}
      </div>
    );
  }
}
HomePage.propTypes = {
  filters: React.PropTypes.object,
  children: React.PropTypes.node,
};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
