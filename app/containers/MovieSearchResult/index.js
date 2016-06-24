/*
 *
 * MovieSearchResult
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectMovieSearchResult from './selectors';
import Navigation from 'components/Navigation';
import WelcomeText from 'components/WelcomeText';
import SearchForm from 'components/SearchForm';


export class MovieSearchResult extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor( props ) {
    super( props );
    console.log( this.props );
    this.feeling = this.props.get;
  }

  render() {

    return (
      <div>
        <Navigation />
        <h1>Movie result</h1>
        <h2>You're looking for a {this.feeling} movie</h2>
      </div>
    );
  }
}

const mapStateToProps = selectMovieSearchResult();

function mapDispatchToProps( dispatch ) {
  return {
    dispatch,
  };
}

export default connect( mapStateToProps, mapDispatchToProps )( MovieSearchResult );
