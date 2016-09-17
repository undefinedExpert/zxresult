/**
*
* MovieArticle
*
*/

import React from 'react';
import styles from './styles.css';
import Genres from 'components/special/MovieGenres';
import MovieTitle from 'components/special/MovieTitle';
import CrewList from 'components/special/MovieCrewList';
import HeartRate from 'components/special/MovieHeartRate';
import MovieRuntime from 'components/special/MovieRuntime';
import MovieDescription from 'components/special/MovieDescription';

function MovieArticle(props) {
  const {
    movie,
  } = props;
  const crewItems = [
    { image: movie.backdrop_path, alt: 'test', title: 'Director', sectionSize: '1/3' },
    { image: movie.backdrop_path, alt: 'test', title: 'Cast', sectionSize: '1/3' },
    { image: movie.backdrop_path, alt: 'test', title: 'Cast', sectionSize: '1/3' },
  ];
  const votes = {
    voteAverage: movie.vote_average,
    voteCount: movie.vote_average,
  };
  return (
    <article className={styles.movieArticle}>
      <MovieTitle movieTitle={movie.title} />
      <HeartRate votes={votes} />
      <MovieDescription description={movie.overview} limit={160} />
      <MovieRuntime />
      <Genres />
      <CrewList items={crewItems} />
    </article>
  );
}

MovieArticle.propTypes = {
  movie: React.PropTypes.object,
  className: React.PropTypes.string,
};

export default MovieArticle;
