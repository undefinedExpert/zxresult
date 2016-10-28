/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import { connect } from 'react-redux';
import React, { PropTypes as ptype, Component } from 'react';

import Button from 'components/general/Button';

import { mapDispatch, mapState } from './mapProps';


/**
 * RequestMovie
 * @desc Button which handles getting movies processes chain
 * TODO: Refactor
 */
export class RequestMovie extends Component { // eslint-disable-line react/prefer-stateless-function

  updateAndRoute = () => {
    if (this.props.isFetching) return;
    this.props.movieUpdate();
  };

  fetchFunc = () => {
    const isFetching = this.props.isFetching;
    if (isFetching) {
      return (
        <h4>Loading...</h4>
      );
    }
    return null;
  };

  noMoreResults = () => {
    const noMoreResults = this.props.noMoreResults;
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
  isFetching: ptype.bool,
  movieUpdate: ptype.func,
  noMoreResults: ptype.bool,
};

const mapStateToProps = mapState();

const mapDispatchToProps = (dispatch) => mapDispatch(dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RequestMovie);
