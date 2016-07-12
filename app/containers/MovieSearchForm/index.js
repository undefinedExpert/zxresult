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
import Select from 'react-select';

export class MovieSearchForm extends React.Component { // eslint-disable-line react/prefer-stateless-function

  // fixme: https://github.com/reactjs/redux/issues/239
  componentWillMount() {
    // Make xhr call
    if (this.props.filters.genreList <= 0) {
      this.props.getGenreList();
    }
  }
  // Zmienia dane
  onChange = (value) => {
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

    const renderInput = () => (
      <div>
        <Select
          value={genre}
          onChange={this.onChange}
          valueKey="name"
          labelKey="name"
          autoload={false}
          options={genreList}
        />
        <h2>Genre: {genre}</h2>
      </div>
    );

    return (
      <div>
        <form onSubmit={this.props.onSubmitForm} className={styles.form}>
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
  getGenreList: React.PropTypes.func,
  onChangeMood: React.PropTypes.func,
  mood: React.PropTypes.string,
  genre: React.PropTypes.string,
  genreList: React.PropTypes.array,
  onChangeGenre: React.PropTypes.func,
  onChangeSentence: React.PropTypes.func,
  filterUpdate: React.PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  filters: createSelector(
    selectFilters(),
    createStructuredSelector({
      mood: (state) => state.mood,
      genre: (state) => state.genre.name,
      genreList: (state) => state.genreList,
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
      console.log(evt.preventDefault);
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      return false;
      // dispatch(loadRepos());
    },
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieSearchForm);
