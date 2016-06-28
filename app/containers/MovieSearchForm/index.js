/*
 *
 * MovieSearchForm
 *
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { selectMovieSearchForm } from './selectors';
import Button from 'components/Button';
import styles from './styles.css';
import { createStructuredSelector } from 'reselect';
import { push } from 'react-router-redux';

export class MovieSearchForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  openRoute = (route) => {
    this.props.changeRoute(route);
  };

  routeToResult = () => {
    console.log('siemanko');
    this.openRoute('/result');
  };
  onSubmit = (event) => {
    this.props.onSubmitForm();
  };

  // TODO: fix the issue with handling onSubmit event
  render() {
    return (
      <div>
        <form action="" onSubmit={this.props.onSubmitForm} className={styles.form}>

        </form>
        <Button handleRoute={this.routeToResult}>Search</Button>
      </div>
    );
  }
}


MovieSearchForm.propTypes = {
  repos: React.PropTypes.string,
  changeRoute: React.PropTypes.func,
  children: React.PropTypes.node,
  onSubmitForm: React.PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  repos: selectMovieSearchForm(),
});

function mapDispatchToProps(dispatch) {
  return {
    changeRoute: (url) => dispatch(push(url)),
    onSubmitForm: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      // dispatch(loadRepos());
    },
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieSearchForm);
