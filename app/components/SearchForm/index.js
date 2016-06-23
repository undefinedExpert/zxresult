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

  onSubmitHandler( event ) {
    event.preventDefault();
    console.log( this.state );
    browserHistory.push( '/result' )
  }

  render() {
    return (
      <div className={styles.searchForm}>
        <form onSubmit={this.onSubmitHandler}>
          <select className={'c-select'}>
            <option defaultValue>Pick The Mood</option>
            <option value="sad">Sad</option>
            <option value="funny">Funny</option>
            <option value="dramatic">Dramatic</option>
          </select>
          <select className="c-select">
            <option defaultValue>Select trend</option>
            <option value="classical">Classical</option>
            <option value="popular">Popular</option>
            <option value="modern">Modern</option>
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
