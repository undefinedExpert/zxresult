/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import React, { PropTypes as ptype } from 'react';

import BlankImage from 'components/general/BlankImage';
import LazyImage from 'components/general/LazyImage';
import styles from './styles.css';


/**
 * MovieSingleCrew
 * @desc Single representation of a crew member.
 * @memberOf MovieCrewList
 */
function MovieSingleCrew(item) {
  const photoPath = `http://image.tmdb.org/t/p/w154${item.profile_path}`;

  return (
    <div className={styles.container}>
      <div className={styles.image}>
        {item.profile_path ? <LazyImage src={photoPath} ><img alt={item.alt} /></LazyImage> : <BlankImage />}
      </div>
      <h4 className={styles.name}>{item.name}</h4>
      <h5 className={styles.character}>
        As <b>{item.job || item.character}</b>
      </h5>
    </div>
  );
}

MovieSingleCrew.propTypes = {
  path: ptype.string,
  alt: ptype.string,
};

export default MovieSingleCrew;
