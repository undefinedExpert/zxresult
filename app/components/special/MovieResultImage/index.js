/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import className from 'classnames';
import React, { PropTypes as ptype } from 'react';

import LazyImage from 'components/general/LazyImage';
import ProgressiveImage from 'components/general/ProgressiveImage';

import styles from './styles.css';


const MovieResultImage = (props) => {
  const { classNames, isActive = true, image, ...rest } = props;
  const sizes = image.aspect_ratio < 1 ? ['w185', 'w500', 'original'] : ['w300', 'w780', 'original'];
  const photoPath = `http://image.tmdb.org/t/p/${sizes[0]}/${image.file_path}`;

  // handle BlankImage when there is no src <BlankImage className={styles.blankImage} />
  return (
    <div className={className(styles.resultImage)}>
      <div className={styles.imageContainer}>
        {
          isActive ?
            <ProgressiveImage src={photoPath} sizes={sizes}>
              <img src={photoPath} role="presentation" className={className(styles.image, classNames)} {...rest} />
            </ProgressiveImage>
            : null
        }
      </div>
    </div>
  );
};

MovieResultImage.propTypes = {
  onLoad: ptype.func,
  isActive: ptype.bool,
  classNames: ptype.string,
  image: ptype.object.isRequired,
};

export default MovieResultImage;
