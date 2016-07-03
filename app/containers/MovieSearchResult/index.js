/*
 *
 * MovieSearchResult
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectFilters, selectSingleResult } from 'containers/App/selectors';
import Navigation from 'components/Navigation';
// <h1>{this.props.filters.trend}</h1>
// <h1>{this.props.filters.mood}</h1>
// <h1>{this.props.filters.decade}</h1>
export class MovieSearchResult extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    // console.log(this.props.filters);
    return (
      <div>
        <Navigation />
        <h1>Title: {this.props.result.original_title}</h1>
        <h2>{this.props.result.overview}</h2>
      </div>
    );
  }
}

MovieSearchResult.propTypes = {
  filters: React.PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  filters: selectFilters(),
  result: selectSingleResult(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieSearchResult);
