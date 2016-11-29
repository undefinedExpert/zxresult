/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import { curry } from 'lodash';
import className from 'classnames';
import React, { PropTypes as ptype, Component } from 'react';

import { convertToPattern } from 'utils/hooks';

import styles from './styles.css';


/**
 * @desc Default values for image size loaders. loaded is a representation of: Is this image is loaded?
 * Pattern is a function which replace specific part of URL, so we could download bigger image.
 */
const smallDefaultState = { loaded: false, pattern: convertToPattern(/\w45/g, 'w154') };
const mediumDefaultState = { loaded: false, pattern: convertToPattern(/\w154/g, 'w500') };


/**
 * MovieResultImage
 * @desc Render single result image, it provides primitive lazy-load solution
 * returns packed prop.children with title and appropriate grid size.
 *
 * @method componentWillReceiveProps - Reset image loaders state to default
 * @method onLoadHandler - Handles onLoad event, loads bigger images.
 * @method handleImageSizeLoading - helps with updating state for appropriate image size.
 *
 * returns single result image.
 */
class MovieResultImage extends Component {
  state = {
    small: smallDefaultState,
    medium: mediumDefaultState,
    isRevealed: false,
  };

  componentWillReceiveProps() {
    this.setState({ small: smallDefaultState, medium: mediumDefaultState });
  }

  onLoadHandler = (e) => {
    const {
      small,
      medium } = this.state;

    const path = e.target.attributes.src.value;
    const setAttr = curry((pattern) => e.target.setAttribute('src', pattern));
    const loadImage = curry((imageSize) => this.handleImageSizeLoading(setAttr, path, imageSize));

    if (!small.loaded) {
      loadImage('small');
    }
    else if (small.loaded && !medium.loaded) {
      loadImage('medium');
    }
  };

  onClickHandler = () => {
    this.setState({ isRevealed: !this.state.isRevealed });
  };

  handleImageSizeLoading(setAttr, path, imageSize) {
    const which = this.state[imageSize];

    setAttr(which.pattern(path));
    this.setState({ [imageSize]: { loaded: true } });
  }

  render() {
    const { path, alt } = this.props;
    const { isRevealed } = this.state;
    return (
      <div className={className(styles.resultImage, isRevealed ? styles.isRevealed : null)} onClick={this.onClickHandler}>
        <div className={styles.overlay}></div>
        <div className={styles.imageContainer}>
          <img
            ref="photo"
            onLoad={this.onLoadHandler}
            alt={alt}
            className={styles.image}
            src={`http://image.tmdb.org/t/p/original${path}`}
          />
        </div>
      </div>
    );
  }
}

MovieResultImage.propTypes = {
  path: ptype.string,
  alt: ptype.string,
};

export default MovieResultImage;
