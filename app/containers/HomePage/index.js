/*
 *
 * HomePage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { selectFilters } from 'containers/App/selectors';
import { createStructuredSelector } from 'reselect';
import Navigation from 'components/Navigation';
import MovieSearchForm from 'containers/MovieSearchForm';
import WelcomeText from 'components/WelcomeText';

export class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    console.log(this.props.filters);
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
  filters: React.PropTypes.object,
  children: React.PropTypes.node,
};

const mapStateToProps = createStructuredSelector({
  filters: selectFilters(),
});


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
