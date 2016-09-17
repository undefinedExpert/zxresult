/**
*
* MovieArticle
*
*/

import React from 'react';
import styles from './styles.css';
import HeartRate from 'components/HeartRate';
import Genres from 'components/Genres';
import CrewList from 'components/CrewList';
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
  return (
    <article className={styles.movieArticle}>
      <MovieTitle sectionSize={'1/1'} movieTitle={movie.title} />
      {movie.vote_count ?
        <HeartRate sectionSize="1/1" voteAverage={movie.vote_average} /> :
        <HeartRate sectionSize="1/1" voteAverage={null} msg="Rating isn't available" />
      }
      <MovieDescription sectionSize="1/1" description={movie.overview} limit={160} />
      <MovieRuntime sectionSize={'1/2'} />
      <Genres sectionSize={'1/2'} />
      <CrewList items={crewItems} />
    </article>
  );
}

MovieArticle.propTypes = {
  movie: React.PropTypes.object,
  className: React.PropTypes.string,
};

export default MovieArticle;
