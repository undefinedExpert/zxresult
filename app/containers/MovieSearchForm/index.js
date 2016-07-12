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
import {initialize} from 'redux-form';

const options = [
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two' },
];


export class MovieSearchForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  getOptions = (input, callback) => {
    this.props.getGenreList(input);

    callback(null, {
      options: this.props.genreList,
      // CAREFUL! Only set this to true when there are no more options,
      // or more specific queries will not be sent to the server.
      // complete: true
    });
  };

  selectOnChange = (event) => {
    console.log(event);
  };

  routeToResult = () => {
    // console.log('siemanko');
    this.openRoute('/result');
  };

  openRoute = (route) => {
    this.props.changeRoute(route);
  };

  handleSelectChange = (value) => {
    this.props.genre = value;
    this.setState({ value });
  };
  // TODO: fix the issue with handling onSubmit event
  // render() {
  //   return (
  //     <div>
  //       <form action="" onSubmit={this.props.onSubmitForm} className={styles.form}>
  //         <input className="form-control" name="genre" id="genre" value={this.props.genre} onChange={this.props.onChangeGenre} />
  //         <h2>Genre: {this.props.genre}</h2>
  //       </form>
  //
  //       <Button handleRoute={this.props.filterUpdate}>Update filters</Button>
  //       <Button handleRoute={this.routeToResult}>Search</Button>
  //       <Select
  //         name="form-field-name"
  //         value="action"
  //         options={options}
  //         value={this.props.genre}
  //         onChange={this.handleSelectChange}
  //       />
  //     </div>
  //   );
  // }
  render() {
    return (
      <div>
        <Form />
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

const mapStateToProps = createSelector(
  selectFilters(),
  createStructuredSelector({
    mood: (state) => state.mood,
    genre: (state) => state.genre.name,
    genreList: (state) => state.genreList,
  }),
);

function mapDispatchToProps(dispatch) {
  return {
    // onChangeMood: (evt) => dispatch(moodUpdate(evt)),
    onChangeGenre: (evt) => dispatch(genreUpdate(evt.target.value)),
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
