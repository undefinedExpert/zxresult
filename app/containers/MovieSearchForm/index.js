/*
 *
 * MovieSearchForm
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Button from 'components/Button';
import styles from './styles.css';
import { selectFilters, selectMood, selectGenre } from 'containers/App/selectors';
import { createStructuredSelector } from 'reselect';
import { push } from 'react-router-redux';
import { moodUpdate, genreUpdate, filterFormUpdate } from 'containers/App/actions';

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
    // console.log(genreUpdate);

    return (
      <div>
        <h1></h1>
        <form action="" onSubmit={this.props.onSubmitForm} className={styles.form}>
          <input className="form-control" name="mood" id="mood" value={this.props.genre} onChange={this.props.onChangeGenre} />
        </form>
        <Button handleRoute={this.props.filterUpdate}>Update filters</Button>
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
  filterFormUpdate: React.PropTypes.func,
  onChangeMood: React.PropTypes.func,
  mood: React.PropTypes.string,
  genre: React.PropTypes.string,
  onChangeGenre: React.PropTypes.func,
  filterUpdate: React.PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  filters: selectFilters(),
  mood: selectMood(),
  genre: selectGenre(),
});

function mapDispatchToProps(dispatch) {
  return {
    // onChangeMood: (evt) => dispatch(moodUpdate(evt)),
    onChangeMood: (evt) => dispatch(moodUpdate(evt.target.value)),
    onChangeGenre: (evt) => dispatch(genreUpdate(evt.target.value)),
    changeRoute: (url) => dispatch(push(url)),
    filterUpdate: () => dispatch(filterFormUpdate()),
    onSubmitForm: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      // dispatch(loadRepos());
    },
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieSearchForm);
