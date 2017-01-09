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
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        {item.profile_path ? <LazyImage size="w154" path={item.profile_path} alt={item.alt} isActive /> : <BlankImage />}
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
