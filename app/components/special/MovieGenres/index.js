/**
*
* Genres
*
*/

import React from 'react';
import styles from './styles.css';
import Section from 'components/general/Section';
import GenreIcons from 'components/special/MovieGenreIcons';

function MovieGenres(props) {
  const {
    sectionSize = '1/2',
  } = props;
  return (
    <Section title={'MovieGenres'} size={sectionSize}>
      <ul className={styles.genres}>
        <li className={styles.item}>
          <GenreIcons type="Horror" />
          <h6 className={styles.label}>Action</h6>
        </li>
        <li className={styles.item}>
          <GenreIcons type="SciFi" />
          <h6 className={styles.label}>Sci-fi</h6>
        </li>
        <li className={styles.item}>
          <GenreIcons type="Comedy" />
          <h6 className={styles.label}>Comedy</h6>
        </li>
      </ul>
    </Section>
  );
}

MovieGenres.propTypes = {
  sectionSize: React.PropTypes.string,
};

export default MovieGenres;
