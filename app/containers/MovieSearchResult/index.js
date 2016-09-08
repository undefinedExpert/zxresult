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
import { truncate, times } from 'lodash';
import { IoHeart, IoClock } from 'react-icons/lib/io/';

export class MovieSearchResult extends React.Component { // eslint-disable-line react/prefer-stateless-function
  renderHeart = (voteAverage) => {
    const range = 5;
    const unfilled = Math.ceil(range - voteAverage);
    const filled = voteAverage;

    function renderHearts(type) {
      return (times(type === 'unfilled' ? unfilled : filled, () => (
        <IoHeart className={type === 'unfilled' ? classNames(styles.icon, styles.unfilled) : styles.icon} />
      )));
    }
    return (
      <div>
        {voteAverage}
        {renderHearts()}
        {renderHearts('unfilled')}
      </div>
    );
  };

  renderRate = (voteAverage) => (
    <Section className={classNames(styles.item, styles.rate)} title={'Rate'}>
      {this.renderHeart(voteAverage / 2)}
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
          <ResultImage path={`http://image.tmdb.org/t/p/original/${movie.poster_path}`} alt="" />
        </section>
        <article className={styles.information}>
          <Section className={classNames(styles.item, styles.header)} title={'Title'}>
            <h1>{movie.original_title} (2016)</h1>
          </Section>
          {/* Render rate section*/}
          {movie.vote_average ? this.renderRate(movie.vote_average) : null}
          <Section className={classNames(styles.item, styles.description)} title={'Description'}>
            {truncate(movie.overview, { length: 140 })}
          </Section>
          <div className={styles.item}>
            <Section className={styles.section} title={'Runtime'}>
              <span><IoClock className={styles.icon} /> 2h 31min</span>
            </Section>
            <Section className={classNames(styles.section, styles.genres)} title={'Genres'}>
              <ul>
                <li>
                  <IoClock className={styles.genreIcon} size={40} preserveAspectRatio="xMidYMin meet" />
                  <h6>Action</h6>
                </li>
                <li>
                  <IoClock className={styles.genreIcon} size={40} preserveAspectRatio="xMidYMin meet" />
                  <h6>Sci-fi</h6>
                </li>
                <li>
                  <IoClock className={styles.genreIcon} size={40} preserveAspectRatio="xMidYMin meet" />
                  <h6>Comedy</h6>
                </li>
              </ul>
            </Section>
          </div>
          <div className={styles.item}>
            <Section className={styles.section} title={'Director'}>
              <img src={`http://image.tmdb.org/t/p/original/${movie.backdrop_path}`} width="130px" alt="Director Name" />
              <h4>Zack Snyder</h4>
              <h4>Known for Man of Steel</h4>
            </Section>
            <Section className={styles.section} title={'Cast'}>
              <img src={`http://image.tmdb.org/t/p/original/${movie.backdrop_path}`} width="130px" alt="Director Name" />
              <h4>Ben Affleck</h4>
              <h4>As Bruce Wayne/Batman</h4>
            </Section>
          </div>
          <BottomNavigation />
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
