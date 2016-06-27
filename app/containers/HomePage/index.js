/*
 *
 * HomePage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { selectHomePage } from './selectors';
import { createStructuredSelector } from 'reselect';
import Navigation from 'components/Navigation';
import MovieSearchForm from 'containers/MovieSearchForm';
import WelcomeText from 'components/WelcomeText';

export class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Navigation />
        <WelcomeText />
        <MovieSearchForm />
        {this.props.children}
      </div>
    );
  }
}
HomePage.propTypes = {
  repos: React.PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  repos: selectHomePage(),
});


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
