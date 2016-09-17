/*
 *
 * MovieSearchResult
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import MovieArticle from 'components/MovieArticle';
import Gallery from 'components/Gallery';
import { createStructuredSelector, createSelector } from 'reselect';
import { selectResult } from 'containers/App/selectors';
import styles from './styles.css';


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
