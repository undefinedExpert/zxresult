/*
 *
 * MovieSearchResult
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Button from 'components/Button';
import ResultImage from 'components/ResultImage';
import BottomNavigation from 'containers/BottomNavigation';
import { createStructuredSelector, createSelector } from 'reselect';
import { selectFilters, selectResult } from 'containers/App/selectors';
import { filterFormUpdate } from 'containers/App/actions';
import styles from './styles.css';
import classNames from 'classnames';


export class MovieSearchResult extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={styles.result}>
        <div className={classNames(styles.gallery, styles.item)}>
          <ResultImage path={`http://image.tmdb.org/t/p/original/${this.props.result.movie.poster_path}`}  alt=""/>
        </div>
        <div className={classNames(styles.information, styles.item)}>
          <h1>Title: {this.props.result.movie.original_title}</h1>
          <h2>{this.props.result.movie.overview}</h2>
          <BottomNavigation />
        </div>
      </div>
    );
  }
}

MovieSearchResult.propTypes = {
  filterUpdate: React.PropTypes.func,
  filters: React.PropTypes.object,
  result: React.PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  result: createSelector(
    selectResult(),
    createStructuredSelector({
      movie: (state) => state.movie,
    })
  ),
  filters: createSelector(
    selectFilters(),
    createStructuredSelector({
      mood: (state) => state.mood,
      genre: (state) => state.genre,
      genreList: (state) => state.genreList,
    })
  ),
});

function mapDispatchToProps(dispatch) {
  return {
    filterUpdate: () => dispatch(filterFormUpdate()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieSearchResult);
