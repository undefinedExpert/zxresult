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
import { genreUpdate, filterFormUpdate, genreListSet } from 'containers/App/actions';
import Select from 'components/Select';

export class MovieSearchForm extends React.Component { // eslint-disable-line react/prefer-stateless-function

  // fixme: https://github.com/reactjs/redux/issues/239
  componentWillMount() {
    // Make xhr call
    if (this.props.filters.genreList <= 0) {
      this.props.getGenreList();
    }
  }
  // Zmienia dane
  onChangeSelector = (value) => {
    this.props.onChangeGenre(value.name);
  };

  routeToResult = () => {
    this.openRoute('/result');
  };

  openRoute = (route) => {
    this.props.changeRoute(route);
  };
  render() {
    const {
      filters: { genre, genreList },
    } = this.props;

    const renderInput = (value, array) => (
      <div>
        <Select
          value={value}
          isLoading={array <= 0}
          onChange={this.onChangeSelector}
          options={array}
        />
        <h2>Genre: {value}</h2>
      </div>
    );

    return (
      <div>
        <form onSubmit={this.props.onSubmitForm} className={styles.form}>

          {renderInput(genre, genreList)}
          {renderInput(genre, genreList)}
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
  getGenreList: React.PropTypes.func.isRequired,
  onChangeGenre: React.PropTypes.func,
  filterUpdate: React.PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  filters: createSelector(
    selectFilters(),
    createStructuredSelector({
      mood: (state) => state.mood,
      genre: (state) => state.genre.active.name,
      genreList: (state) => state.genre.list,
    }),
  ),
  ohio: () => 'ohio',
});

function mapDispatchToProps(dispatch) {
  return {
    // onChangeMood: (evt) => dispatch(moodUpdate(evt)),
    onChangeGenre: (value) => dispatch(genreUpdate(value)),
    changeRoute: (url) => dispatch(push(url)),
    filterUpdate: () => dispatch(filterFormUpdate()),
    getGenreList: () => dispatch(genreListSet()),
    onSubmitForm: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    },
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieSearchForm);
