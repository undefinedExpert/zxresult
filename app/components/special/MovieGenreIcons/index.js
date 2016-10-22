/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import React, { PropTypes as ptype } from 'react';

import styles from './styles.css';
import Icons from './icons/index';

/**
 * MovieGenreIcons
 * @desc Render prepared svg icon for our genre.
 * @param type - What kind of icon we wish to render.
 */
function MovieGenreIcons({ type }) {
  // console.log(Icons[props.type]);
  const cs = styles.genreIcons;
  return (
    <div className={cs}>
      <img src={Icons[type]} alt={`${type} icon`} />
    </div>
  );
}

MovieGenreIcons.propTypes = {
  type: ptype.string.isRequired,
};

export default MovieGenreIcons;
