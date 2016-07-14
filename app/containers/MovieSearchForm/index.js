/*
 *
 * MovieSearchForm
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import styles from './styles.css';
import { selectFilters } from 'containers/App/selectors';
import { createStructuredSelector, createSelector } from 'reselect';
import { push } from 'react-router-redux';
import { updateFilterGenre, filterFormUpdate } from 'containers/App/actions';
import SelectList from 'components/SelectList';
import Select from 'components/Select';

export class MovieSearchForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  // fixme: https://github.com/reactjs/redux/issues/239
  componentWillMount() {
    // Make xhr call
    if (this.props.filters.genre.list <= 0) {
      this.props.getGenreList();
    }
  }

  // Zmienia dane
  onChangeSelector = (value) => {
    this.props.onChangeGenre(value);
  };

  // Template for select
  renderSelect = (item, index) => {
    const { onChangeHandler } = this.props;
    return (
      <div key={index}>
        <Select
          value={item.active.name}
          key={index}
          isLoading={item.list <= 0}
          options={item.list}
          onChange={onChangeHandler}
        />
        <h2>Genre: {item.active.name}</h2>
      </div>
    );
  };

  render() {
    const {
      filters: { genre },
    } = this.props;

    return (
      <div>
        <form onSubmit={this.props.onSubmitForm} className={styles.form}>
          <SelectList
            items={[genre]}
            renderHandler={this.renderSelect}
            onChangeHandler={this.onChangeSelector}
          />
        </form>

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
  onChangeGenre: React.PropTypes.func,
  filterUpdate: React.PropTypes.func,
  onChangeHandler: React.PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  filters: createSelector(
    selectFilters(),
    createStructuredSelector({
      mood: (state) => state.mood,
      genre: (state) => state.genre,
    }),
  ),
  ohio: () => 'ohio',
});

function mapDispatchToProps(dispatch) {
  return {
    // onChangeMood: (evt) => dispatch(updateFilterMood(evt)),
    onChangeGenre: (value) => dispatch(updateFilterGenre.active.request(value)),
    changeRoute: (url) => dispatch(push(url)),
    filterUpdate: () => dispatch(filterFormUpdate()),
    getGenreList: () => dispatch(updateFilterGenre.list.request()),
    onSubmitForm: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    },
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieSearchForm);
