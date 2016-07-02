/*
 *
 * MovieSearchForm
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Button from 'components/Button';
import styles from './styles.css';
import { selectFilters, selectMood } from 'containers/App/selectors';
import { createStructuredSelector } from 'reselect';
import { push } from 'react-router-redux';
import moodUpdate from 'containers/App/actions';

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
    // console.log(moodUpdate);

    return (
      <div>
        <h1></h1>
        <form action="" onSubmit={this.props.onSubmitForm} className={styles.form}>
          <select className="form-control" name="mood" id="mood" value={this.props.mood} onChange={this.props.onChangeMood}>
            <option value="funny">Funny</option>
            <option value="sad">Sad</option>
          </select>
        </form>
        <Button handleRoute={this.routeToResult}>Search</Button>
      </div>
    );
  }
}


MovieSearchForm.propTypes = {
  filters: React.PropTypes.object,
  changeRoute: React.PropTypes.func,
  children: React.PropTypes.node,
  onSubmitForm: React.PropTypes.func,
  onChangeMood: React.PropTypes.func,
  mood: React.PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  filters: selectFilters(),
  mood: selectMood(),
});

function mapDispatchToProps(dispatch) {
  return {
    // onChangeMood: (evt) => dispatch(moodUpdate(evt)),
    onChangeMood: (evt) => dispatch(moodUpdate(evt.target.value)),
    changeRoute: (url) => dispatch(push(url)),
    onSubmitForm: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      // dispatch(loadRepos());
    },
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieSearchForm);
