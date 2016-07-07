/*
 *
 * MovieSearchForm
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Button from 'components/Button';
import styles from './styles.css';
import { selectFilters } from 'containers/App/selectors';
import { createStructuredSelector, createSelector } from 'reselect';
import { push } from 'react-router-redux';
import { sentenceUpdate, filterFormUpdate } from 'containers/App/actions';

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
        <h1></h1>
        <form action="" onSubmit={this.props.onSubmitForm} className={styles.form}>
          <input className="form-control" name="sentence" id="sentence" value={this.props.sentence} onChange={this.props.onChangeSentence} />
        </form>
        <Button handleRoute={this.props.filterUpdate}>Update filters</Button>
        <Button handleRoute={this.routeToResult}>Search</Button>
        <h2>Genre: {this.props.genre}</h2>

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
  sentence: React.PropTypes.string,
  onChangeGenre: React.PropTypes.func,
  onChangeSentence: React.PropTypes.func,
  filterUpdate: React.PropTypes.func,
};

const mapStateToProps = createSelector(
  selectFilters(),
  createStructuredSelector({
    sentence: (state) => state.sentence,
    mood: (state) => state.mood,
    genre: (state) => state.genre,
    genreList: (state) => state.genreList,
  })
);

function mapDispatchToProps(dispatch) {
  return {
    // onChangeMood: (evt) => dispatch(moodUpdate(evt)),
    onChangeSentence: (evt) => dispatch(sentenceUpdate(evt.target.value)),
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
