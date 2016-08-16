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

export class MovieSearchForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  // fixme: https://github.com/reactjs/redux/issues/239
  componentWillMount() {
    // Make xhr call
    if (this.props.filters.genre.list <= 0) {
      this.props.getGenreList();
    }
  }

  // genreHandler
  onChangeGenreHandler = (value) => {
    this.props.onChangeGenre(value);
  };

  render() {
    const {
      filters: { genre },
    } = this.props;
    const items = [{ value: genre.active, list: genre.list }];
    return (
      <div>
        <form onSubmit={this.props.onSubmitForm} className={styles.form}>
          <SelectList
            items={items}
            onChangeHandler={this.onChangeGenreHandler}
            title="Genre"
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

const mapStateToProps = mapState();

function mapDispatchToProps(dispatch) {
  return mapDispatch(dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieSearchForm);
