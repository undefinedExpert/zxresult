/**
 *
 * ResultImage
 *
 */

import React from 'react';
import ReactDOM from 'react-dom';
import styles from './styles.css';

class MovieResultImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isAnimationBegin: true, top: 0, bottom: 0, imageHeight: 0 };
  }

  imageLoad = (e) => {
    // TODO: Create scan animation
    const path = e.target.attributes.src.value;
    const pathBigger = path.replace(/\w45/g, 'w154');
    const pathBiggest = path.replace(/\w154/g, 'w780');
    if (path === pathBigger || path === pathBiggest) {
      e.target.setAttribute('src', pathBiggest);
    }
    if (path === pathBigger) return;
    e.target.setAttribute('src', pathBigger);
    // console.log(e.target.offsetHeight);
  };

  render() {
    const {
      path,
      alt,
    } = this.props;
    return (
      <div className={styles.resultImage}>
        <div className={styles.overlay}></div>
        <div className={styles.imageContainer}>
          <img
            onLoad={this.imageLoad}
            alt={alt}
            className={styles.image}
            src={`http://image.tmdb.org/t/p/w45/${path}`}
          />
        </div>
      </div>
    );
  }
}

MovieResultImage.propTypes = {
  path: React.PropTypes.string,
  alt: React.PropTypes.string,
};

export default MovieResultImage;
