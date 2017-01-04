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
 * @desc Default values for image size loaders. loaded is a representation of: Is this image size is loaded?
 * Pattern is a function which replace specific part of URL, so we could download bigger image.
 * TODO: sizes sets should not be hardcoded
 */
const smallDefaultState = { loaded: false, pattern: convertToPattern(/\w45/g, 'w154') };
const mediumDefaultState = { loaded: false, pattern: convertToPattern(/\w154/g, 'w500') };
const bigDefaultState = { loaded: false, pattern: convertToPattern(/\w500/g, 'original') };


/**
 * LazyImage
 * @desc Allow us to render lazy loaded image with progressive loading
 * TODO: handle condition where image does not contain size
 * helper: http://stackoverflow.com/questions/9815762/detect-when-an-image-fails-to-load-in-javascript
 * TODO: API endpoint shouldn't be hardcoded
 */
class LazyImage extends Component {
  state = {
    isLoading: false,
    small: smallDefaultState,
    medium: mediumDefaultState,
    big: bigDefaultState,
  };

  // Check if mounted image isActive (visible), if yes run lazyLoading
  // Also it won't run if there is no imagePlaceholder
  componentDidMount() {
    if (this.imagePlaceholder && this.props.isActive) {
      this.lazyLoad();
    }
  }

  // Check if we did receive new "potential" image, if yes reset sizes, and their loading status to default
  componentWillReceiveProps({ isActive, path }) {
    if ((isActive && path !== this.props.path) || (isActive !== this.props.isActive)) {
      this.setState({ small: smallDefaultState, medium: mediumDefaultState, big: bigDefaultState });
    }
  }

  // Check if we did receive new "potential" image, if yes run lazyLoad, important to mention
  // is fact that imagePlaceholder has to be available in view.
  componentDidUpdate(prevProps) {
    const { isActive, path } = prevProps;

    if ((path !== this.props.path) || (isActive !== this.props.isActive)) {
      this.lazyLoad();
    }
  }

  // Stop image from being downloaded when new result occur
  componentWillUnmount() {
    if (!this.lazyLoadedImage) return;

    // Abort image loading
    this.lazyLoadedImage.setAttribute('src', '');
  }

  // Load stack of images progressively, one after another
  progressiveLoad = (e) => {
    // get predefined sizes, select active source
    const { small, medium, big } = this.state;
    const path = e.target.attributes.src.value;

    // allow us to curry our element "setAttribute" method with predefined 'src' value, then use in handleImageSizeLoading method
    // so we won't need to specify src all the time
    const setAttr = curry((pattern) => e.target.setAttribute('src', pattern));

    // It will load appropriate image from size
    const loadImage = curry((imageSize) => this.handleImageSizeLoading(setAttr, path, imageSize));

    // small image wasn't loaded (small isn't the smallest size, as we get into step the image already loaded smallest size)
    if (!small.loaded) {
      loadImage('small');
    }
    else if (small.loaded && !medium.loaded) {
      loadImage('medium');
    }
    else if (medium.loaded && !big.loaded) {
      loadImage('big');

      // If we finished with downloading all content we just set isLoading to false
      this.setState({ isLoading: false });
    }
  };

  // Help us load appropriate image size
  handleImageSizeLoading(setAttr, path, imageSize) {
    // which size we will load now?
    const which = this.state[imageSize];

    // replace src attribute with pattern & mark pattern as loaded
    setAttr(which.pattern(path));
    this.setState({ [imageSize]: { loaded: true } });
  }

  // help us with firstly loading fully image and then with displaying it
  lazyLoad = () => {
    const { path } = this.props;
    this.setState({ isLoading: true });

    // smallest size
    const size = 'w45';
    const photoPath = `http://image.tmdb.org/t/p/${size}${path}`;

    // Start downloading the image
    this.lazyLoadedImage = new Image();
    this.lazyLoadedImage.setAttribute('src', photoPath);

    // When new image will be downloaded, invoke replaceLazyLoadImage
    this.lazyLoadedImage.addEventListener('load', this.replaceLazyLoadImage);
  };

  // Handles swapping src of lazyloaded image with our imagePlaceholder
  replaceLazyLoadImage = () => {
    // Check if imagePlaceholder is still in view, and lazyLoadedImage exist
    // FIXME: Does we really need to check this if?
    if (this.imagePlaceholder && this.lazyLoadedImage) {
      // swap both placeholder and just loaded image src's
      const source = this.lazyLoadedImage.getAttribute('src');
      this.imagePlaceholder.setAttribute('src', source);

      // Remove lazy loaded image
      this.lazyLoadedImage = null;
    }
  };

  render() {
    const { className, role, alt } = this.props;

    return (
      <div>
        {this.state.isLoading ? <LoadingIndicator /> : null}
        <img
          alt={alt}
          role={role}
          className={className}
          onLoad={this.progressiveLoad}
          ref={img => { this.imagePlaceholder = img; }}
        />
      </div>
    );
  }
}

LazyImage.propTypes = {
  alt: ptype.string,
  path: ptype.string,
  role: ptype.string,
  isActive: ptype.bool,
  className: ptype.string,
};

export default LazyImage;
