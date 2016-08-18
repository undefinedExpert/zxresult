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
    if(this.props.result.isFetching) return;

    this.props.movieUpdate();
    if (!this.props.result.isFetching) {
      this.routeToResult();
    }
  };

  render() {
    return (
      <div>
        <Button onClick={this.props.movieUpdate}>Update filters</Button>
        <Button handleRoute={this.routeToResult}>Search</Button>
        <Button onClick={this.updateAndRoute} isLoading={this.props.result.isFetching}>Update filters and route to result when it's done</Button>
      </div>
    );
  }
}

BottomNavigation.propTypes = {
  filterUpdate: React.PropTypes.func,
  changeRoute: React.PropTypes.func,
  movieUpdate: React.PropTypes.func,
  fetching: React.PropTypes.bool,
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
