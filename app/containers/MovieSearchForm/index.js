/*
 *
 * MovieSearchForm
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import styles from './styles.css';
import { mapDispatch, mapState } from './mapProps';
import SelectList from 'components/SelectList';
import Input from 'components/Input';
import BottomNavigation from 'containers/BottomNavigation';
import classNames from 'classnames';

export class MovieSearchForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  // fixme: https://github.com/reactjs/redux/issues/239
  componentWillMount() {
    // Make xhr call
    if (this.props.filters.genre.list <= 0) {
      this.props.getGenreList();
      this.props.getUpdateFilters();
    }
  }

  // genreHandler
  onChangeGenreHandler = (value) => {
    this.props.onChangeGenre(value);
    this.props.getUpdateFilters();
  };

  onChangeDecadeHandler = (value) => {
    this.props.onChangeDecade(value);
    this.props.getUpdateFilters();
  };

  onChangeTrendHandler = (value) => {
    this.props.onChangeTrend(value);
    this.props.getUpdateFilters();
  };

  render() {
    const {
      filters: { genre, decade, trend },
      orientation,
    } = this.props;
    const selectListItems = [
      { value: genre.active, list: genre.list, options: { onChangeHandler: this.onChangeGenreHandler, title: 'Genre' } },
      { value: decade.active, list: decade.list, options: { onChangeHandler: this.onChangeDecadeHandler, title: 'Decade' } },
      { value: trend.active, list: trend.list, options: { onChangeHandler: this.onChangeTrendHandler, title: 'Trend' } },
    ];
    return (
      <div>
        <form onSubmit={this.props.onSubmitForm} className={styles.form}>
          <div className={classNames(styles.filters, styles[orientation])} >
            <Input type="text" title="Sentence" placeholder="Sentence placeholder" />
            <SelectList
              items={selectListItems}
            />
            <BottomNavigation />
          </div>
        </form>
      </div>
    );
  }
}

MovieSearchForm.propTypes = {
  filters: React.PropTypes.object,
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
  filterUpdate: React.PropTypes.func,
  onChangeHandler: React.PropTypes.func,
};

const mapStateToProps = mapState();

function mapDispatchToProps(dispatch) {
  return mapDispatch(dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieSearchForm);
