/**
 *
 * SearchForm
 *
 */

import React from 'react';
import { browserHistory } from 'react-router';
import styles from './styles.css';

class SearchForm extends React.Component {
  constructor( props ) {
    super( props );
    this.state = { feeling: '' };

    this.onSubmitHandler = this.onSubmitHandler.bind( this );

  }

  onSubmitHandler( event ) {
    event.preventDefault();
    let feeling = this.state.feeling;

    // console.log( this.state.feeling );
    //{ pathname: '/user/bob', query: { showAge: true } }
    // browserHistory.push( `/result/${feeling}` )
    browserHistory.push( { pathname: '/result', query: { feeling } } )
  }

  change( event ) {
    this.setState( { feeling: event.target.value } );
  }
  
  render() {
    return (
      <div className={styles.searchForm}>
        <form onSubmit={this.onSubmitHandler}>
          <select className="c-select" id="feeling" onChange={this.change.bind(this)} value={this.state.feeling}>
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
