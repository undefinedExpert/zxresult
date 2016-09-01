/*
 *
 * BottomNavigation
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Button from 'components/Button';
import { updateMovieResult } from 'containers/App/actions';
import { push } from 'react-router-redux';
import { createStructuredSelector, createSelector } from 'reselect';
import { selectResult } from 'containers/App/selectors';

export class BottomNavigation extends React.Component { // eslint-disable-line react/prefer-stateless-function

  routeToResult = () => {
    this.openRoute('/result');
  };

  openRoute = (route) => {
    this.props.changeRoute(route);
  };
  updateAndRoute = () => {
    if (this.props.result.isFetching) return;

    this.props.movieUpdate();
    // Tutaj musimy uruchomic akcje ktora odpowiada za wywolanie zmiany url
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
  render() {
    return (
      <div>
        {this.fetchFunc()}
        <Button onClick={this.updateAndRoute}>Update filters and route to result when it's done</Button>
      </div>
    );
  }
}

BottomNavigation.propTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(BottomNavigation);
