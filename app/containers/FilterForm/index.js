/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import classNames from 'classnames';
import { connect } from 'react-redux';
import { capitalize } from 'lodash';
import React, { PropTypes as ptype, Component } from 'react';

import Select from 'components/general/Select';
import RequestMovie from 'containers/RequestMovie';
import SelectList from 'components/general/SelectList';

import styles from './styles.css';
import { mapDispatch, mapState } from './mapProps';


/**
 * FilterForm
 * @desc Creates filters form, where user is able to get results with data he set. Each time when some filter change,
 * it will dispatch an action and get possible range of results with current set of filters.
 *
 * @method componentWillMount - Get genre list directly from API.
 * @method onChangeSelectHandler - Dispatch an appropriate action when specific selector will change it's value.
 * @method onSubmitHandler - Prevent from sending form & refresh the page
 *
 * @attr orientation - Handles horizontal, vertical orientation of this form by applying appropriate css class.
 */
export class FilterForm extends Component {
  componentWillMount() {
    // Get Genre list (by dispatching an action)
    const genreList = this.props.genre.list;
    if (genreList <= 0) {
      this.props.getGenreList();
      this.props.getUpdateFilters();
    }
  }

  onChangeSelectHandler = (type, wantUpdate = true) => {
    const which = `onChange${capitalize(type)}`;
    return (value) => {
      this.props[which](value);
      if (wantUpdate) this.props.getUpdateFilters();
    };
  };

  onInputChangeKeywordHandler = () => (value) => {
    if (value.length >= 3) {
      this.props.inputChangeKeyword(value);
    }
  };

  onSubmitHandler = (e) => {
    e.preventDefault();
    this.props.onSubmitForm();
  };

  render() {
    const {
      keyword,
      genre,
      decade,
      trend,
      range,
      orientation } = this.props;

    const selectListItems = [
      {
        value: genre.active,
        options: genre.list,
        isLoading: genre.list <= 0,
        onChange: this.onChangeSelectHandler('Genre'),
        title: 'Genres',
      },
      {
        value: decade.active,
        options: decade.list,
        onChange: this.onChangeSelectHandler('Decade'),
        title: 'Decade',
      },
      {
        value: trend.active,
        options: trend.list,
        isLoading: false,
        onChange: this.onChangeSelectHandler('Trend'),
        title: 'Trend',
      },
    ];

    const searchKeyword = {
      value: keyword.active.query || keyword.active.name,
      options: keyword.list,
      labelKey: 'name',
      isLoading: keyword.list === 0,
      onInputChange: this.onInputChangeKeywordHandler(),
      onChange: this.onChangeSelectHandler('Keyword'),
      title: 'Keyword',
      className: styles['style-sup'],
    };
    // onInputChange get list of current typed query,
    // onChange request updateFilters and include with_genres in url
    return (
      <div>
        <form onSubmit={this.onSubmitHandler} className={styles.form}>
          <div className={classNames(styles.filters, styles[orientation])} >
            <Select {...searchKeyword} />
            <SelectList items={selectListItems} />
            <RequestMovie range={range.results} />
            <div>
              current range is:
              <h6>pages: {range.pages}</h6>
              <h6>results: {range.results}</h6>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

FilterForm.propTypes = {
  keyword: ptype.object,
  genre: ptype.object,
  decade: ptype.object,
  trend: ptype.object,
  range: ptype.object,
  orientation: ptype.string,
  onSubmitForm: ptype.func,
  getGenreList: ptype.func,
  onChangeGenre: ptype.func,
  onChangeTrend: ptype.func,
  onChangeDecade: ptype.func,
  inputChangeKeyword: ptype.func,
  getUpdateFilters: ptype.func,
};

const mapStateToProps = mapState();

const mapDispatchToProps = (dispatch) => mapDispatch(dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FilterForm);
