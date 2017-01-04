/**
*  Components are imported in specific (scope based) order:
*  1. Node_modules
*  2. Application
*  3. Module
*/

import { curry } from 'lodash';
import React, { PropTypes as ptype, Component } from 'react';

import { convertToPattern } from 'utils/hooks';
import LoadingIndicator from 'components/general/LoadingIndicator';


/**
 * @desc Default values for image size loaders. loaded is a representation of: Is this image is loaded?
 * Pattern is a function which replace specific part of URL, so we could download bigger image.
 * TODO: we should use react syntheticEvent instead of addEventListener.
 */
const smallDefaultState = { loaded: false, pattern: convertToPattern(/\w45/g, 'w154') };
const mediumDefaultState = { loaded: false, pattern: convertToPattern(/\w154/g, 'w500') };
const bigDefaultState = { loaded: false, pattern: convertToPattern(/\w500/g, 'original') };


/**
* LazyImage
*
*/
class LazyImage extends Component {
  state = {
    isLoading: false,
    small: smallDefaultState,
    medium: mediumDefaultState,
    big: bigDefaultState,
  };

  componentDidMount() {
    if (this.imagePlaceholder && this.props.isActive) {
      this.lazyLoad();
    }
  }

  componentWillReceiveProps({ isActive, path }) {
    if ((isActive && path !== this.props.path) || (isActive !== this.props.isActive)) {
      this.setState({ small: smallDefaultState, medium: mediumDefaultState, big: bigDefaultState });
    }
  }

  componentDidUpdate(prevProps) {
    const { isActive, path } = prevProps;
    if ((path !== this.props.path) || (isActive !== this.props.isActive)) {
      this.lazyLoad();
    }
  }

  componentWillUnmount() {
    if (!this.lazyLoadedImage) return;
    this.lazyLoadedImage.setAttribute('src', ''); // Abort image loading
  }

  lazyLoad = () => {
    const { path, absolutePath } = this.props;
    this.setState({ isLoading: true });
    const size = 'w45';
    const photoPath = absolutePath || `http://image.tmdb.org/t/p/${size}${path}`;

    this.lazyLoadedImage = new Image();
    this.lazyLoadedImage.setAttribute('src', photoPath);

    this.lazyLoadedImage.addEventListener('load', this.handleOnLoad);
  };

  progressiveLoad = (e) => {
    const { small, medium, big } = this.state;
    const path = e.target.attributes.src.value;
    const setAttr = curry((pattern) => e.target.setAttribute('src', pattern));
    const loadImage = curry((imageSize) => this.handleImageSizeLoading(setAttr, path, imageSize));

    if (!small.loaded) {
      loadImage('small');
    }
    else if (small.loaded && !medium.loaded) {
      loadImage('medium');
    }
    else if (medium.loaded && !big.loaded) {
      loadImage('big');
      this.setState({ isLoading: false });
    }
  };

  handleImageSizeLoading(setAttr, path, imageSize) {
    const which = this.state[imageSize];

    setAttr(which.pattern(path));
    this.setState({ [imageSize]: { loaded: true } });
  }

  handleOnLoad = () => {
    if (this.imagePlaceholder && this.lazyLoadedImage) {
      const source = this.lazyLoadedImage.getAttribute('src');
      this.imagePlaceholder.setAttribute('src', source);
      this.lazyLoadedImage = null;
    }
  };

  render() {
    return (
      <div>
        {this.state.isLoading ? <LoadingIndicator /> : null}
        <img
          ref={img => { this.imagePlaceholder = img; }}
          role="presentation"
          className={this.props.className}
          onLoad={this.progressiveLoad}
        />
      </div>
    );
  }
}

LazyImage.propTypes = {
  className: ptype.string,
};

export default LazyImage;
