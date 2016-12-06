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
 * @desc Requests movie from database, display messages which describe:
 * - If there is any movie we might propose
 * - If user saw all our propositions
 */
export class RequestMovie extends Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.messages = {
      initial: 'Search',
      noMovieOnInitial: 'Filters are too specific',
      noMoreResults: 'End of results',
    };

    this.state = {
      activeButtonMessage: this.messages.initial,
    };
  }

  componentWillReceiveProps({ noMoreResults, range }) {
    if (noMoreResults) {
      this.setActiveMessage(this.messages.noMoreResults);
    }

    else if (range === 0) {
      this.setActiveMessage(this.messages.noMovieOnInitial);
    }

    else {
      this.setActiveMessage(this.messages.initial);
    }
  }

  setActiveMessage(msg) {
    this.setState({ activeButtonMessage: msg });
  }

  updateAndRoute = () => {
    if (this.props.isFetching) return;
    this.props.requestMovie();
  };

  render() {
    const {
      range,
      isFetching,
      noMoreResults } = this.props;
    const { activeButtonMessage } = this.state;
    const isDisabled = range === 0 || noMoreResults;

    return (
      <div >
        <Button onClick={this.updateAndRoute} style={{ height: '40px', minWidth: '120px', padding: '0 20px' }} disabled={isDisabled}>
          {isFetching ? <LoadingIndicator isDisabled={isDisabled} /> : activeButtonMessage}
        </Button>
      </div>
    );
  }
}

RequestMovie.propTypes = {
  range: ptype.number,
  isFetching: ptype.bool,
  requestMovie: ptype.func,
  noMoreResults: ptype.bool,
};

const mapStateToProps = mapState();

const mapDispatchToProps = (dispatch) => mapDispatch(dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RequestMovie);
