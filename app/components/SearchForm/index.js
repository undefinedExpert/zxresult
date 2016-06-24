/**
 *
 * SearchForm
 *
 */

import React from 'react';

import styles from './styles.css';

import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

class SearchForm extends React.Component {
  constructor( props ) {
    super( props );
    this.state = { feeling: '' };

    this.onSubmitHandler = this.onSubmitHandler.bind( this );

  }

  onSubmitHandler( event ) {
    event.preventDefault();
    let feeling = this.state.feeling === '' || this.state.feeling === 'select' ? 'random' : this.state.feeling;

    console.log( feeling );
    browserHistory.push( `/result/${feeling}` )
  }

  onChangeFeeling( event ) {
    this.setState( { feeling: event.target.value } );
  }

  render() {
    return (
      <div className={styles.searchForm}>
        <h2 id="h2test">test</h2>
        <form onSubmit={this.onSubmitHandler}>
          <select className="c-select" id="feeling" onChange={this.onChangeFeeling.bind(this)}
                  value={this.state.feeling}>
            <option value="select">Select the feeling</option>
            <option value="sad">Sad</option>
            <option value="emotional">Emotional</option>
            <option value="weird">Weird</option>
          </select>
          <div>
            <button type="Submit" className="btn btn-primary">Look for movie</button>
          </div>
        </form>
      </div>
    );
  }
}

export default SearchForm;
