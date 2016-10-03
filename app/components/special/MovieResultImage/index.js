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
    console.log(e.target.offsetHeight);
  };

  render() {
    const {
      path,
      alt,
    } = this.props;
    console.log(styles);
    return (
      <div className={styles.resultImage}>
        <div className={styles.overlay}></div>
        <div className={styles.imageContainer}>
          <img
            onLoad={this.imageLoad}
            alt={alt}
            className={styles.image}
            src={`http://image.tmdb.org/t/p/w154/${path}`}
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
