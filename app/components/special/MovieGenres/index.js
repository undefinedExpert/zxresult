/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import React, { PropTypes as ptype } from 'react';

import Section from 'components/general/Section';
import GenreIcons from 'components/special/MovieGenreIcons';

import styles from './styles.css';

/**
 * @desc Render Single Select Component, based on it's props.
 * @param sectionSize - How much space this section will take, default 1/2 but it
 * might be changed directly in the parent component.
 * TODO: Make this working, it has to use real data and replace all icons with that from API.
 */
function MovieGenres({ sectionSize = '1/2' }) {
  return (
    <Section title={'Genres'} size={sectionSize}>
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
  sectionSize: ptype.string,
};

export default MovieGenres;
