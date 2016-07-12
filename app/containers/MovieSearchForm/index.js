/*
 *
 * MovieSearchForm
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Button from 'components/Button';
import Form from 'components/SearchForm';
import styles from './styles.css';
import { selectFilters } from 'containers/App/selectors';
import { createStructuredSelector, createSelector } from 'reselect';
import { push } from 'react-router-redux';
import { genreUpdate, filterFormUpdate, genreListSet } from 'containers/App/actions';
import Select from 'react-select';

const options = [
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two' },
];

export class MovieSearchForm extends React.Component { // eslint-disable-line react/prefer-stateless-function

  // Zmienia dane
  onChange(value) {
    console.log(value);
    this.props.onChangeGenreSelector(value);
  }

  getOptions = (input, callback) => {
    this.props.getGenreList(input);

    callback(null, {
      options: this.props.genreList,
      // CAREFUL! Only set this to true when there are no more options,
      // or more specific queries will not be sent to the server.
      // complete: true
    });
  };

  routeToResult = () => {
    // console.log('siemanko');
    this.openRoute('/result');
  };

  openRoute = (route) => {
    this.props.changeRoute(route);
  };


  // Pobiera dane
  getContributors = (input, callback) => {
    let genreList = this.props.filters.genreList;
    if (genreList.length <= 0) this.props.getGenreList(input);
    // callback(null, {
    //   options: this.props.filters.genreList,
    //   // CAREFUL! Only set this to true when there are no more options,
    //   // or more specific queries will not be sent to the server.
    //   // complete: true
    // });

    // input = input.toLowerCase();
    let options = genreList.filter((i) => {
      console.log(i);
      return i.name.substr(0, input.length) === input;
    });



    setTimeout(() => {

      let data = {
        options: this.props.filters.genreList,
        complete: options.length <= 6,
      };
      callback(null, data);
    }, 500);
  };
  // TODO: fix the issue with handling onSubmit event
  render() {
    const {
      filters: { genre },
    } = this.props;

    const renderInput = () => <div>
      <Select.Async
        value={genre}
        onChange={this.props.onChangeGenreSelector}
        valueKey="name"
        labelKey="name"
        loadOptions={this.getContributors}
      />
      <input className="form-control" name="genre" id="genre" value={genre} onChange={this.props.onChangeGenre} />
      <h2>Genre: {genre}</h2>
    </div>;

    return (
      <div>
        <form onSubmit={this.props.onSubmitForm} className={styles.form}>
          {renderInput(genre)}
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
    onChangeGenre: (evt) => dispatch(genreUpdate(evt.target.value)),
    onChangeGenreSelector: (value) => dispatch(genreUpdate(value)),
    changeRoute: (url) => dispatch(push(url)),
    filterUpdate: () => dispatch(filterFormUpdate()),
    getGenreList: (value) => dispatch(genreListSet(value)),
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
