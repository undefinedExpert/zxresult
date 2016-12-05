/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import className from 'classnames';
import React, { PropTypes as ptype, Component } from 'react';

import { convertToPattern } from 'utils/hooks';
import LoadingIndicator from 'components/general/LoadingIndicator';

import styles from './styles.css';


/**
 * @desc Default values for image size loaders. loaded is a representation of: Is this image is loaded?
 * Pattern is a function which replace specific part of URL, so we could download bigger image.
 */
const smallDefaultState = { loaded: false, pattern: convertToPattern(/\w45/g, 'w154') };
const mediumDefaultState = { loaded: false, pattern: convertToPattern(/\w154/g, 'w500') };


/**
 * MovieResultImage
 * @desc Render single result image.
 * @return packed prop.children with title and appropriate grid size.
 */
class MovieResultImage extends Component {
  state = {
    small: smallDefaultState,
    medium: mediumDefaultState,
    isRevealed: false,
  };

  onClickHandler = () => {
    this.setState({ isRevealed: !this.state.isRevealed });
  };

  render() {
    const { path, absolutePath, lazyLoading } = this.props;
    const { isRevealed } = this.state;
    const photoPath = absolutePath || `http://image.tmdb.org/t/p/original${path}`;
    return (
      <div className={className(styles.resultImage, isRevealed ? styles.isRevealed : null)} onClick={this.onClickHandler}>
        <div className={styles.overlay}></div>
        <div className={styles.imageContainer}>
          <img
            role="presentation"
            className={className(styles.image, 'swiper-lazy')}
            data-src={lazyLoading ? photoPath : null}
            src={!lazyLoading ? photoPath : null}
          />
          <LoadingIndicator className="swiper-loading-indicator" style={{ 'background-image': 'none' }} />
        </div>
      </div>
    );
  }
}

MovieResultImage.propTypes = {
  path: ptype.string,
  absolutePath: ptype.string,
  lazyLoading: ptype.bool,
};

export default MovieResultImage;
