/*
 *
 * MovieSearchForm
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectMovieSearchForm from './selectors';
import Button from 'components/Button';
import styles from './styles.css';

export class MovieSearchForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <form action="#" className={styles.form}>
          <div>
            <Button type="submit">Search</Button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = selectMovieSearchForm();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieSearchForm);
