/*
 *
 * MovieSearchResult
 *
 */

import React from 'react';
import styles from './styles.css';
import { connect } from 'react-redux';
import Gallery from 'components/special/MovieGallery';
import { selectResult } from 'containers/App/selectors';
import MovieArticle from 'components/special/MovieArticle';
import { createStructuredSelector, createSelector } from 'reselect';

export class MovieSearchResult extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      result: {
        movie,
      },
    } = this.props;

    return (
      <section className={styles.result}>
        <Gallery path={movie.poster_path} alt={`${movie.original_title}`} />
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
