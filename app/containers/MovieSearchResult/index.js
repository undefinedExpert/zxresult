/*
 *
 * MovieSearchResult
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectFilters }  from './selectors';

export class MovieSearchResult extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <h1>Movie result</h1>
        <h1>{this.props.filters.trend}</h1>
        <h1>{this.props.filters.mood}</h1>
        <h1>{this.props.filters.decade}</h1>
        <h2>You're looking for a {this.feeling} movie</h2>
      </div>
    );
  }
}

MovieSearchResult.propTypes = {
  filters: React.PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  filters: selectFilters(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieSearchResult);
