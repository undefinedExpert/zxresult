/**
*
* SingleCrew
*
*/

import React from 'react';
import styles from './styles.css';

function MovieSingleCrew(props) {
  const {
    path,
    alt,
  } = props;
  return (
    <div>
      <div className={styles.image}>
        <img
          src={`http://image.tmdb.org/t/p/original/${path}`}
          alt={alt}
        />
      </div>
      <h4>Ben Affleck</h4>
      <h4>As Bruce Wayne/Batman</h4>
    </div>
  );
}

MovieSingleCrew.propTypes = {
  path: React.PropTypes.string,
  alt: React.PropTypes.string,
};

export default MovieSingleCrew;
