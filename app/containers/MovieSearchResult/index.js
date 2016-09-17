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
import CrewList from 'components/CrewList';
import MovieTitle from 'components/MovieTitle';
import MovieSearchForm from 'containers/MovieSearchForm';
import { createStructuredSelector, createSelector } from 'reselect';
import { selectResult } from 'containers/App/selectors';
import styles from './styles.css';
import classNames from 'classnames';
import { truncate } from 'lodash';
import { IoClock } from 'react-icons/lib/io/';

export class MovieSearchResult extends React.Component { // eslint-disable-line react/prefer-stateless-function
  renderTitle = (movieTitle) => (
    <MovieTitle movieTitle={movieTitle} sectionSize={'1/2'} />
  );

  renderDescription = (description, limitToNumber) => (
    <Section size={'1/1'} title={'Description'}>
      <p>{truncate(description, { length: limitToNumber })}</p>
    </Section>
  );
  renderRuntime = () => (
    <Section title={'Runtime'} size={'1/2'}>
      <span><IoClock className={styles.icon} size={50} /> 2h 31min</span>
    </Section>
  );

  renderCrew = (image) => {
    const items = [
      { image, alt: 'test', title: 'test', sectionSize: '1/3' },
      { image, alt: 'test', title: 'test', sectionSize: '1/3' },
      { image, alt: 'test', title: 'test', sectionSize: '1/3' },
    ];
    return (
      <div>
        <CrewList items={items} />
      </div>
    );
  };
  renderImage = (path, alt) => (
    <ResultImage
      path={`http://image.tmdb.org/t/p/original/${path}`}
      alt={alt}
    />
  );
  renderFilters = (orientation) => (
    <MovieSearchForm orientation={orientation} />
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
            {this.renderTitle(movie.original_title)}
            {movie.vote_count ? <HeartRate voteAverage={movie.vote_average} /> : <HeartRate voteAverage={null} msg="Rating isn't available" />}

            {this.renderDescription(movie.overview, 160)}
          </div>
          <div className={styles.item}>
            {this.renderRuntime()}
            <Genres title={'Genres'} sectionSize={'1/2'} />
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
});

function mapDispatchToProps() {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieSearchResult);
