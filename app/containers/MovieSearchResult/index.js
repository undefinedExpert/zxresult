/*
 *
 * MovieSearchResult
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import ResultImage from 'components/ResultImage';
import Section from 'components/Section';
import HeartRate from 'components/HeartRate';
import Genres from 'components/Genres';
import MovieSearchForm from 'containers/MovieSearchForm';
import { createStructuredSelector, createSelector } from 'reselect';
import { selectFilters, selectResult } from 'containers/App/selectors';
import { filterFormUpdate } from 'containers/App/actions';
import styles from './styles.css';
import classNames from 'classnames';
import { truncate } from 'lodash';
import { IoClock } from 'react-icons/lib/io/';

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
          <ResultImage
            path={`http://image.tmdb.org/t/p/original/${movie.poster_path}`}
            alt={`${movie.original_title} poster`}
          />
          <MovieSearchForm orientation="horizontal" />
        </section>

        <article className={styles.information}>
          <Section className={classNames(styles.item, styles.header)} title={'Title'}>
            <h1 className={styles.title}>{movie.original_title} <span className={styles.date}>(2016)</span></h1>
          </Section>
          {/* RATE SECTION */}
          <Section className={classNames(styles.item, styles.rate)} title={'Rate'}>
            {movie.vote_count ? <HeartRate voteAverage={movie.vote_average} /> :
              <HeartRate voteAverage={null} msg="Rating isn't available" />}
          </Section>

          <Section className={classNames(styles.item, styles.description)} title={'Description'}>
            {truncate(movie.overview, { length: 160 })}
          </Section>
          <div className={styles.item}>
            <Section className={classNames(styles.section, styles.runtime)} title={'Runtime'}>
              <span><IoClock className={styles.icon} size={50} /> 2h 31min</span>
            </Section>
            <Section className={classNames(styles.section, styles.genres)} title={'Genres'}>
              <Genres />
            </Section>
          </div>
          <div className={styles.item}>
            <Section className={classNames(styles.section, styles['--crew'])} title={'Director'}>
              <div className={styles.image}>
                <img
                  src={`http://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                  alt="Director Name"
                />
              </div>
              <h4>Zack Snyder</h4>
              <h4>Known for Man of Steel</h4>
            </Section>
            <Section className={classNames(styles.section, styles['--crew'])} title={'Cast'}>
              <div className={styles.image}>
                <img
                  src={`http://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                  alt="Cast Name"
                />
              </div>
              <h4>Ben Affleck</h4>
              <h4>As Bruce Wayne/Batman</h4>
            </Section>
            <Section className={classNames(styles.section, styles['--crew'])} title={'Cast'}>
              <div className={styles.image}>
                <img
                  src={`http://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                  alt="Cast Name"
                />
              </div>
              <h4>Ben Affleck</h4>
              <h4>As Bruce Wayne/Batman</h4>
            </Section>
          </div>
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
