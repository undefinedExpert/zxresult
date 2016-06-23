/**
 *
 * SearchForm
 *
 */

import React from 'react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import styles from './styles.css';

class SearchForm extends React.Component {
  constructor( props ) {
    super( props );
    this.state = { feeling: '' };
  }

  onSubmitHandler( event ) {
    event.preventDefault();
    let feeling = this.state.feeling;

    // console.log( this.state.feeling );
    
    browserHistory.push( `/result/${feeling}` )
  }

  change( event ) {
    this.setState( { feeling: event.target.value } );
  }


  render() {
    return (
      <div className={styles.searchForm}>
        <form onSubmit={this.onSubmitHandler.bind(this)}>
          <select className="c-select" id="feeling" onChange={this.change.bind(this)} value={this.state.feeling}>
            <option value="select">Select</option>
            <option value="Java">Java</option>
            <option value="C++">C++</option>
          </select>
          <p>{this.state.value}</p>

          <div>
            <button type="Submit" className="btn btn-primary">Look for movie</button>
          </div>
        </form>
      </div>
    );
  }
}

export default SearchForm;
