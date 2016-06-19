/**
*
* SearchForm
*
*/

import React from 'react';

import styles from './styles.css';

class SearchForm extends React.Component {
  render() {
    return (
      <div className={styles.searchForm}>
        <form action="submit">
          <select className={'c-select'}>
            <option selected>Pick The Mood</option>
            <option value="sad">Sad</option>
            <option value="funny">Funny</option>
            <option value="dramatic">Dramatic</option>
          </select>
          <select className="c-select">
            <option selected>Select trend</option>
            <option value="classical">Classical</option>
            <option value="popular">Popular</option>
            <option value="modern">Modern</option>
          </select>
          <div>
            <Link href="/result" className="btn btn-primary">Look for movie</Link>
          </div>
        </form>
      </div>
    );
  }
}

export default SearchForm;
