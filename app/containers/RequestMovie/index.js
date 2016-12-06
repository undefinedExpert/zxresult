/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import { connect } from 'react-redux';
import React, { PropTypes as ptype, Component } from 'react';

import Button from 'components/general/Button';
import LoadingIndicator from 'components/general/LoadingIndicator';

import { mapDispatch, mapState } from './mapProps';


/**
 * RequestMovie
 * @desc Button which handles getting movies processes chain
 * TODO: Refactor
 */
export class RequestMovie extends Component { // eslint-disable-line react/prefer-stateless-function

  state = {
    msgs: {
      active: this.initial,
      initial: 'Search',
      noMovieOnInitial: 'Filters are too specific',
      noMoreResults: 'End of results',
    },
  };

  componentWillReceiveProps(nextProps, nextState) {

  }

  updateAndRoute = () => {
    if (this.props.isFetching) return;
    this.props.movieUpdate();
  };

  noMoreResults = () => (
    <h4>No more results</h4>
  );

  render() {
    const {
      range,
      isFetching,
      noMoreResults } = this.props;

    const msg = {
      initial: 'Search',
      noMovieOnInitial: range === 0 ? 'Filters are too specific' : null,
      noMoreResults: noMoreResults ? 'End of results' : 'Search',
    };

    console.log('noMoreResults', noMoreResults, msg.noMoreResults)

    return (
      <div >
        {noMoreResults ? this.noMoreResults() : null}
        <Button onClick={this.updateAndRoute} style={{ height: '40px', minWidth: '120px', padding: '0 20px' }} disabled={range === 0 || noMoreResults}>
          {isFetching ? <LoadingIndicator isDisabled={range === 0 || noMoreResults} /> : (msg.noMovieOnInitial || msg.noMoreResults)}
        </Button>
      </div>
    );
  }
}

RequestMovie.propTypes = {
  range: ptype.number,
  isFetching: ptype.bool,
  movieUpdate: ptype.func,
  noMoreResults: ptype.bool,
};

const mapStateToProps = mapState();

const mapDispatchToProps = (dispatch) => mapDispatch(dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RequestMovie);
