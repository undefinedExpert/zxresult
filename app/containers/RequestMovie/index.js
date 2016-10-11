/*
 *
 * BottomNavigation
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Button from 'components/general/Button';
import { selectResult } from './selectors';
import { updateMovieResult } from './actions';
import { createStructuredSelector, createSelector } from 'reselect';

export class RequestMovie extends React.Component { // eslint-disable-line react/prefer-stateless-function

  openRoute = (route) => {
    this.props.changeRoute(route);
  };

  updateAndRoute = () => {
    if (this.props.result.isFetching) return;
    this.props.movieUpdate();
  };

  fetchFunc = () => {
    const isFetching = this.props.result.isFetching;
    if (isFetching) {
      return (
        <h4>Loading...</h4>
      );
    }
    return null;
  };

  noMoreResults = () => {
    const noMoreResults = this.props.result.noMoreResults;
    if (noMoreResults) {
      return (
        <h4>No more results</h4>
      );
    }
    return null;
  };
  render() {
    return (
      <div>
        {this.fetchFunc()}
        {this.noMoreResults()}
        <Button onClick={this.updateAndRoute}>Update filters and route to result when it's done</Button>
      </div>
    );
  }
}

RequestMovie.propTypes = {
  filterUpdate: React.PropTypes.func,
  changeRoute: React.PropTypes.func,
  isFetching: React.PropTypes.bool,
  movieUpdate: React.PropTypes.func,
  fetching: React.PropTypes.bool,
  result: React.PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  result: createSelector(
    selectResult(),
    createStructuredSelector({
      isFetching: (state) => state.isFetching,
      noMoreResults: (state) => state.noMoreResults,
      movie: (state) => state.movie,
      movies: (state) => state.movies,
    }),
  ),
});

function mapDispatchToProps(dispatch) {
  return {
    changeRoute: (url) => dispatch(push(url)),
    movieUpdate: () => dispatch(updateMovieResult.request()),
    dispatch,
  };
}
// Error with container generator, it generate mapDispatchToProps without the first argument
export default connect(mapStateToProps, mapDispatchToProps)(RequestMovie);
