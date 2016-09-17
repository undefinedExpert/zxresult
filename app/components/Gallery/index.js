/**
*
* Gallery
*
*/

import React from 'react';
import styles from './styles.css';
import Section from 'components/Section';
import ResultImage from 'components/ResultImage';
import MovieSearchForm from 'containers/MovieSearchForm';

function Gallery(props) {
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

Gallery.propTypes = {
  path: React.PropTypes.string,
  alt: React.PropTypes.string,
  orientation: React.PropTypes.string,
};

export default Gallery;
