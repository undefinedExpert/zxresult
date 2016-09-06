/*
 *
 * MovieSearchResult
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import ResultImage from 'components/ResultImage';
import Section from 'components/Section';
import BottomNavigation from 'containers/BottomNavigation';
import { createStructuredSelector, createSelector } from 'reselect';
import { selectFilters, selectResult } from 'containers/App/selectors';
import { filterFormUpdate } from 'containers/App/actions';
import styles from './styles.css';
import classNames from 'classnames';
import { truncate } from 'lodash';
import { FaBeer } from 'react-icons/lib/fa/';

// Hack the git
export class MovieSearchResult extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <section className={styles.result}>
        <section className={classNames(styles.gallery, styles.item)}>
          <ResultImage path={`http://image.tmdb.org/t/p/original/${this.props.result.movie.poster_path}`} alt="" />
        </section>
        <article className={styles.information}>
          <header className={classNames(styles.item, styles.header)}>
            <h1>Title: {this.props.result.movie.original_title}</h1>
            <BottomNavigation />
          </header>
          <Section className={styles.item} title={'Rate'}>
            <FaBeer />
          </Section>
          <Section className={styles.item} title={'Description'}>
            <p>
              {truncate(this.props.result.movie.overview, { length: 140 })}
            </p>
          </Section>
          <Section className={styles.item} title={'Runtime'}>
            <p>
              runtime
            </p>
          </Section>
          <Section className={styles.item} title={'Genres'}>
            <p>
              Genres
            </p>
          </Section>
          <Section className={styles.item} title={'Director'}>
            <p>
              Director
            </p>
          </Section>
          <Section className={styles.item} title={'Cast'}>
            <p>
              Cast
            </p>
          </Section>
        </article>
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
