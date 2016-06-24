/*
 *
 * Form
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectForm from './selectors';
import { defaultAction } from './actions'
import { push } from 'react-router-redux';

export class Form extends React.Component { // eslint-disable-line react/prefer-stateless-function

  openRoute = ( route ) => {
    this.props.changeRoute( route );
  };

  /**
   * Changed route to '/features'
   */
  openFeaturesPage = () => {
    this.openRoute( '/result' );
  };

  render() {

    console.log( defaultAction() );
    return (
      <div>
        <label htmlFor="username">Show Github repositories by
          <span>@</span>
          <input
            id="username"
            type="text"
            placeholder="mxstbr"
            value={this.props.username}
            onChange={this.props.onChangeUsername}
          />
        </label>
        <button onClick={this.openFeaturesPage}>Features</button>

        {this.props.username}

      </div>
    );
  }
}

const mapStateToProps = selectForm();

Form.propTypes = {
  username: React.PropTypes.string,
  onChangeUsername: React.PropTypes.func,
  changeRoute: React.PropTypes.func,
};


function mapDispatchToProps( dispatch ) {
  return {
    onChangeUsername: ( evt ) => dispatch( defaultAction( evt.target.value ) ),
    changeRoute: ( url ) => dispatch( push( url ) ),


    dispatch,
  };
}

export default connect( mapStateToProps, mapDispatchToProps )( Form );
