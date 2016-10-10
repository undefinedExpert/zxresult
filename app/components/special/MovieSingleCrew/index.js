/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import React, { PropTypes as ptype } from 'react';

import styles from './styles.css';


/**
 * MovieSingleCrew
 * @desc Single representation of a crew member.
 * @memberOf MovieCrewList
 * TODO: Make this working with real data.
 */
function MovieSingleCrew({ path, alt }) {
  const sourcePath = `http://image.tmdb.org/t/p/original/${path}`;
  return (
    <div>
      <div className={styles.image}>
        <img
          src={sourcePath}
          alt={alt}
        />
      </div>
      <h4>Ben Affleck</h4>
      <h4>As Bruce Wayne/Batman</h4>
    </div>
  );
}

MovieSingleCrew.propTypes = {
  path: ptype.string,
  alt: ptype.string,
};

export default MovieSingleCrew;
