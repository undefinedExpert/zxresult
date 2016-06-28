/*
 *
 * MovieSearchForm
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { selectMovieSearchForm } from './selectors';
import Button from 'components/Button';
import styles from './styles.css';
import { createStructuredSelector } from 'reselect';

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


MovieSearchForm.propTypes = {
  repos: React.PropTypes.string,
  children: React.PropTypes.node,
};

const mapStateToProps = createStructuredSelector({
  repos: selectMovieSearchForm(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieSearchForm);
