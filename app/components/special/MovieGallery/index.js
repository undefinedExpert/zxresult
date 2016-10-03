/**
*
* Gallery
*
*/

import React from 'react';
import styles from './styles.css';
import Section from 'components/general/Section';
import ResultImage from 'components/special/MovieResultImage';
import MovieSearchForm from 'containers/MovieSearchForm';


function MovieGallery(props) {
  const {
    path,
    alt,
    orientation = 'horizontal',
  } = props;
  return (
    <Section className={styles.gallery}>
      <ResultImage path={path} alt={`${alt} poster`} />
      <MovieSearchForm orientation={orientation} />
    </Section>
  );
}

MovieGallery.propTypes = {
  path: React.PropTypes.string,
  alt: React.PropTypes.string,
  orientation: React.PropTypes.string,
};

export default MovieGallery;
