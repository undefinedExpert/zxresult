/*
 *
 * MovieSearchResult
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import ResultImage from 'components/ResultImage';
import MovieArticle from 'components/MovieArticle';
import MovieSearchForm from 'containers/MovieSearchForm';
import { createStructuredSelector, createSelector } from 'reselect';
import { selectResult } from 'containers/App/selectors';
import styles from './styles.css';
import classNames from 'classnames';


export class MovieSearchResult extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      result: {
        movie,
      },
    } = this.props;

    return (
      <section className={styles.result}>
        <section className={classNames(styles.gallery, styles.item)}>
          <ResultImage path={`${movie.poster_path}`} alt={`${movie.original_title} poster`} />
          <MovieSearchForm orientation={'horizontal'} />
        </section>
        <MovieArticle movie={movie} />
      </section>
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
});

function mapDispatchToProps() {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieSearchResult);
