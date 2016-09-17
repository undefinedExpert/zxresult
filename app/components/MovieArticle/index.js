/**
*
* MovieArticle
*
*/

import React from 'react';
import styles from './styles.css';
import Genres from 'components/Genres';
import CrewList from 'components/CrewList';
import HeartRate from 'components/HeartRate';
import MovieTitle from 'components/MovieTitle';
import MovieRuntime from 'components/MovieRuntime';
import MovieDescription from 'components/MovieDescription';

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
