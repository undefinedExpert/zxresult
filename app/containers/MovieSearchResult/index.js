/*
 *
 * MovieSearchResult
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import ResultImage from 'components/ResultImage';
import Section from 'components/Section';
import MovieSearchForm from 'containers/MovieSearchForm';
import { createStructuredSelector, createSelector } from 'reselect';
import { selectFilters, selectResult } from 'containers/App/selectors';
import { filterFormUpdate } from 'containers/App/actions';
import styles from './styles.css';
import classNames from 'classnames';
import { truncate, times } from 'lodash';
import { IoHeart, IoClock } from 'react-icons/lib/io/';
import GenreIcons from 'components/GenreIcons';

export class MovieSearchResult extends React.Component { // eslint-disable-line react/prefer-stateless-function
  renderHeart = (voteAverage) => {
    const average = voteAverage / 2; // voteAverage contains scale 1-10, so we divide by half to make it 1-5
    const voteRange = 5;
    const filled = Math.round(average);
    const unfilled = Math.ceil(voteRange - filled);

    function renderHearts(type) {
      return (times(type === 'unfilled' ? unfilled : filled, (index) => (
        <IoHeart size={32} key={index} className={type === 'unfilled' ? classNames(styles.icon, styles.unfilled) : styles.icon} />
      )));
    }

    return (
      <div>
        {renderHearts()}
        {renderHearts('unfilled')}
      </div>
    );
  };

  renderRate = (voteAverage, msg) => (
    <Section className={classNames(styles.item, styles.rate)} title={'Rate'}>
      {voteAverage !== null ? this.renderHeart(voteAverage) : msg}
    </Section>
  );

  render() {
    const {
      result: {
        movie,
      },
    } = this.props;

    return (
      <section className={styles.result}>
        <section className={classNames(styles.gallery, styles.item)}>
          <ResultImage path={`http://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={`${movie.original_title} poster`} />
          <MovieSearchForm orientation="horizontal" />
        </section>

        <article className={styles.information}>
          <Section className={classNames(styles.item, styles.header)} title={'Title'}>
            <h1 className={styles.title}>{movie.original_title} <span className={styles.date}>(2016)</span></h1>
          </Section>
          {/* Render rate section*/}
          {movie.vote_count ? this.renderRate(movie.vote_average) : this.renderRate(null, 'Rating isn\'t available')}
          <Section className={classNames(styles.item, styles.description)} title={'Description'}>
            {truncate(movie.overview, { length: 160 })}
          </Section>
          <div className={styles.item}>
            <Section className={classNames(styles.section, styles.runtime)} title={'Runtime'}>
              <span><IoClock className={styles.icon} size={50} /> 2h 31min</span>
            </Section>
            <Section className={classNames(styles.section, styles.genres)} title={'Genres'}>
              <ul>
                <li>
                  <GenreIcons type="Horror" />
                  <h6>Action</h6>
                </li>
                <li>
                  <GenreIcons type="SciFi" />
                  <h6>Sci-fi</h6>
                </li>
                <li>
                  <GenreIcons type="Comedy" />
                  <h6>Comedy</h6>
                </li>
              </ul>
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
