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

import Input from 'components/general/Input';
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

  onChangeSelectHandler = (type) => {
    const which = `onChange${capitalize(type)}`;
    return (value) => {
      this.props[which](value);
      this.props.getUpdateFilters();
    };
  };

  onSubmitHandler = (e) => {
    e.preventDefault();
    this.props.onSubmitForm();
  };

  render() {
    const {
      genre,
      decade,
      trend,
      orientation } = this.props;

    const selectListItems = [
      { value: genre.active, list: genre.list, options: { onChangeHandler: this.onChangeSelectHandler('Genre'), title: 'Genres' } },
      { value: decade.active, list: decade.list, options: { onChangeHandler: this.onChangeSelectHandler('Decade'), title: 'Decade' } },
      { value: trend.active, list: trend.list, options: { onChangeHandler: this.onChangeSelectHandler('Trend'), title: 'Trend' } },
    ];

    return (
      <div>
        <form onSubmit={this.onSubmitHandler} className={styles.form}>
          <div className={classNames(styles.filters, styles[orientation])} >
            <Input type="text" title="Sentence" placeholder="Sentence placeholder" />
            <SelectList items={selectListItems} />
            <RequestMovie />
          </div>
        </form>
      </div>
    );
  }
}

FilterForm.propTypes = {
  genre: ptype.object,
  decade: ptype.object,
  trend: ptype.object,
  orientation: ptype.string,
  onSubmitForm: ptype.func,
  getGenreList: ptype.func,
  onChangeGenre: ptype.func,
  onChangeTrend: ptype.func,
  onChangeDecade: ptype.func,
  getUpdateFilters: ptype.func,
};

const mapStateToProps = mapState();

const mapDispatchToProps = (dispatch) => mapDispatch(dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FilterForm);
