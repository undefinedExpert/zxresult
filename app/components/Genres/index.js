/**
*
* Genres
*
*/

import React from 'react';
import GenreIcons from 'components/GenreIcons';
import styles from './styles.css';

function Genres() {
  return (
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
  );
}

Genres.propTypes = {
  genres: React.PropTypes.array,
};

export default Genres;
