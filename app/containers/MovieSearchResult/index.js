/*
 *
 * MovieSearchResult
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Button from 'components/Button';
import { createStructuredSelector } from 'reselect';
import { selectFilters, selectSingleResult } from 'containers/App/selectors';
import Navigation from 'components/Navigation';
import { filterFormUpdate } from 'containers/App/actions';
// <h1>{this.props.filters.trend}</h1>
// <h1>{this.props.filters.mood}</h1>
// <h1>{this.props.filters.decade}</h1>
export class MovieSearchResult extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    // console.log(this.props.filters);
    return (
      <div>
        <Navigation />
        <Button handleRoute={this.props.filterUpdate}>Update filters</Button>
        <h1>Title: {this.props.result.original_title}</h1>
        <h2>{this.props.result.overview}</h2>
        <img src={`http://image.tmdb.org/t/p/w500/${this.props.result.poster_path}`} alt="" />

      </div>
    );
  }
}

MovieSearchResult.propTypes = {
  filterUpdate: React.PropTypes.func,
  filters: React.PropTypes.object,
  result: React.PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  filters: selectFilters(),
  result: selectSingleResult(),
});

function mapDispatchToProps(dispatch) {
  return {
    filterUpdate: () => dispatch(filterFormUpdate()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieSearchResult);
