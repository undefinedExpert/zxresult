/*
 *
 * MovieSearchForm
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { selectMovieSearchForm, siemanko2 } from './selectors';
import Button from 'components/Button';
import styles from './styles.css';
import { createStructuredSelector } from 'reselect';
import { push } from 'react-router-redux';

export class MovieSearchForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  onSubmit = () => {
    this.props.onSubmitForm();
  };

  routeToResult = () => {
    // console.log('siemanko');
    this.openRoute('/result');
  };

  openRoute = (route) => {
    this.props.changeRoute(route);
  };

  // TODO: fix the issue with handling onSubmit event
  render() {
    return (
      <div>
        <h1>{this.props.siemanko}</h1>
        <form action="" onSubmit={this.props.onSubmitForm} className={styles.form}>

        </form>
        <Button handleRoute={this.routeToResult}>Search</Button>
      </div>
    );
  }
}


MovieSearchForm.propTypes = {
  repos: React.PropTypes.object,
  siemanko: React.PropTypes.func,
  changeRoute: React.PropTypes.func,
  children: React.PropTypes.node,
  onSubmitForm: React.PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  repos: selectMovieSearchForm(),
  siemanko: siemanko2(),
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
