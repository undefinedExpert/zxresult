/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import className from 'classnames';
import React, { PropTypes as ptype, Component } from 'react';

import LazyImage from 'components/general/LazyImage';
import BlankImage from 'components/general/BlankImage';
import ProgressiveImage from 'components/general/ProgressiveImage';

import styles from './styles.css';

class MovieResultImage extends Component {
  shouldComponentUpdate(nextProps) {
    // When we get new image path
    if (nextProps.image.file_path !== this.props.image.file_path) {
      return true;
    }

    // hack for swiper, allows us to slide to first image when will be loaded.
    if (nextProps.onLoad !== this.props.onLoad) {
      return true;
    }
    return false;
  }

  render() {
    const { classNames, image, onLoad, ...rest } = this.props;
    const sizes = image.aspect_ratio < 1 ? ['w185', 'w780', 'original'] : ['w45', 'w780', 'original'];
    // TODO: Move hardcoded api link value from this file
    const photoPath = `https://image.tmdb.org/t/p/${sizes[0]}/${image.file_path}`;

    return (
      <div className={className(styles.resultImage)}>
        <div className={styles.imageContainer}>
          {
            <LazyImage src={photoPath}>
              <ProgressiveImage src={photoPath} sizes={sizes} onLoad={onLoad}>
                {image.file_path ? <img role="presentation" className={className(styles.image, classNames)} {...rest} /> : <BlankImage className={styles.blankImage} />}
              </ProgressiveImage>
            </LazyImage>
          }
        </div>
      </div>
    );
  }
}

MovieResultImage.propTypes = {
  onLoad: ptype.func,
  isActive: ptype.bool,
  classNames: ptype.string,
  image: ptype.object.isRequired,
};

export default MovieResultImage;
