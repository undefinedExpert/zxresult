/**
*
* GenreIcons
*
*/

import React from 'react';
import styles from './styles.css';
import Icons from './icons/index';

function MovieGenreIcons(props) {
  console.log(Icons[props.type]);
  return (
    <div className={styles.genreIcons}>
      <img src={Icons[props.type]} alt="icon" />
    </div>
  );
}

MovieGenreIcons.propTypes = {
  type: React.PropTypes.string.isRequired,
};

export default MovieGenreIcons;
