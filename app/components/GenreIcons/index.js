/**
*
* GenreIcons
*
*/

import React from 'react';
import styles from './styles.css';
import Icons from './icons/index';

function GenreIcons(props) {
  return (
    <div className={styles.genreIcons}>
      <img src={Icons[props.type]} alt="icon" />
    </div>
  );
}

GenreIcons.propTypes = {
  type: React.PropTypes.string.isRequired,
};

export default GenreIcons;
