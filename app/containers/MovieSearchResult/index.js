/*
 *
 * MovieSearchResult
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectMovieSearchResult }  from './selectors';

export class MovieSearchResult extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <h1>Movie result</h1>
        <h2>Username: {this.props.movie}</h2>
        <h2>You're looking for a {this.feeling} movie</h2>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieSearchResult);
