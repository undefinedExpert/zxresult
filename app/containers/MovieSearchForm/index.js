/*
 *
 * MovieSearchForm
 *
 */

import React from 'react';
import styles from './styles.css';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { capitalize } from 'lodash';
import Input from 'components/general/Input';
import { mapDispatch, mapState } from './mapProps';
import SelectList from 'components/general/SelectList';
import RequestMovie from 'containers/RequestMovie';

export class MovieSearchForm extends React.Component {
  // fixme: https://github.com/reactjs/redux/issues/239
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
        <form onSubmit={this.props.onSubmitForm} className={styles.form}>
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

MovieSearchForm.propTypes = {
  genre: React.PropTypes.object,
  decade: React.PropTypes.object,
  trend: React.PropTypes.object,
  orientation: React.PropTypes.string,
  changeRoute: React.PropTypes.func,
  children: React.PropTypes.node,
  onSubmitForm: React.PropTypes.func,
  filterFormUpdate: React.PropTypes.func,
  getGenreList: React.PropTypes.func,
  onChangeGenre: React.PropTypes.func,
  onChangeDecade: React.PropTypes.func,
  onChangeTrend: React.PropTypes.func,
  getUpdateFilters: React.PropTypes.func,
  onChangeHandler: React.PropTypes.func,
};

const mapStateToProps = mapState();

function mapDispatchToProps(dispatch) {
  return mapDispatch(dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieSearchForm);
