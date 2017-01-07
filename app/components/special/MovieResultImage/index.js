/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import className from 'classnames';
import React, { PropTypes as ptype } from 'react';

import LazyImage from 'components/general/LazyImage';

import styles from './styles.css';


const MovieResultImage = (props) => (
  <div className={className(styles.resultImage)}>
    <div className={styles.imageContainer}>
      <LazyImage
        afterLoad={props.onLoad}
        role="presentation"
        path={props.path}
        isActive={props.isActive}
        className={className(styles.image)}
        progressiveLoading
      />
    </div>
  </div>
);

MovieResultImage.propTypes = {
  path: ptype.string,
  isActive: ptype.bool,
  onLoad: ptype.func,
};

export default MovieResultImage;
