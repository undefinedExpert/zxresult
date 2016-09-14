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
import SingleCrew from 'components/SingleCrew';
import MovieSearchForm from 'containers/MovieSearchForm';
import { createStructuredSelector, createSelector } from 'reselect';
import { selectFilters, selectResult } from 'containers/App/selectors';
import { filterFormUpdate } from 'containers/App/actions';
import styles from './styles.css';
import classNames from 'classnames';
import { truncate } from 'lodash';
import { IoClock } from 'react-icons/lib/io/';

export class MovieSearchResult extends React.Component { // eslint-disable-line react/prefer-stateless-function
  renderTitle = (title) => (
    <Section className={classNames(styles.item, styles.header)} title={'Title'}>
      <h1 className={styles.title}>{title} <span className={styles.date}>(2016)</span></h1>
    </Section>
  );
  renderRate = (voteCount, voteAverage) => (
    <Section className={classNames(styles.item, styles.rate)} title={'Rate'}>
      {voteCount ?
        <HeartRate voteAverage={voteAverage} /> :
        <HeartRate voteAverage={null} msg="Rating isn't available" />}
    </Section>
  );
  renderDescription = (description, limitToNumber) => (
    <Section className={classNames(styles.item, styles.description)} title={'Description'}>
      {truncate(description, { length: limitToNumber })}
    </Section>
  );
  renderRuntime = () => (
    <Section className={classNames(styles.section, styles.runtime)} title={'Runtime'}>
      <span><IoClock className={styles.icon} size={50} /> 2h 31min</span> </Section>
  );
  renderGenres = () => (
    <Section className={classNames(styles.section, styles.genres)} title={'Genres'}> <Genres /> </Section>
  );
  renderCrew = (image) => (
    <div>
      <Section className={classNames(styles.section, styles['--crew'])} title={'Director'}>
        <SingleCrew path={image} alt="" /> </Section>
      <Section className={classNames(styles.section, styles['--crew'])} title={'Cast'}>
        <SingleCrew path={image} alt="" /> </Section>
      <Section className={classNames(styles.section, styles['--crew'])} title={'Cast'}>
        <SingleCrew path={image} alt="" /> </Section>
    </div>
  );
  renderImage = (path, alt) => (
    <ResultImage
      path={`http://image.tmdb.org/t/p/original/${path}`}
      alt={alt}
    />
  );
  renderFilters = (orientation) => (
    <MovieSearchForm orientation="horizontal" />
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
          {this.renderImage(movie.poster_path, `${movie.original_title} poster`)}
          {this.renderFilters('horizontal')}
        </section>
        <article className={styles.information}>
          <div className={styles.item}>
            {this.renderTitle(movie.original_title)} {this.renderRate(movie.vote_count, movie.vote_average)} {this.renderDescription(movie.overview, 160)}
          </div>
          <div className={styles.item}>
            {this.renderRuntime()} {this.renderGenres()}
          </div>
          <div className={styles.item}>
            {this.renderCrew(movie.backdrop_path)}
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
