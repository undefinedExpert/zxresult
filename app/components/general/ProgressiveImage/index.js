/**
*  Components are imported in specific (scope based) order:
*  1. Node_modules
*  2. Application
*  3. Module
*/

import { curry } from 'lodash';
import React, { PropTypes as ptype, Component } from 'react';

import { convertToPattern } from 'utils/hooks';


/**
 * @desc Default values for image size loaders. loaded is a representation of: Is this image size is loaded?
 * Pattern is a function which replace specific part of URL, so we could download bigger image.
 * TODO: sizes sets should not be hardcoded
 */
const smallDefaultState = { loaded: false, pattern: convertToPattern(/\w45/g, 'w154') };
const mediumDefaultState = { loaded: false, pattern: convertToPattern(/\w154/g, 'w500') };
const bigDefaultState = { loaded: false, pattern: convertToPattern(/\w500/g, 'original') };


/**
* ProgressiveImage
* @desc Allow us to load image with progressive loading solution
 * TODO: Handle unsuccessfully size downloading
*/
class ProgressiveImage extends Component {
  constructor(...args) {
    super(...args);

    // FIXME: Find better way of binding methods into class for testing puproses
    // ES6 classes does not supports autobinding feature and using
    // spy on component.instance().method does not work
    this.progressiveLoad = this.progressiveLoad.bind(this);
    this.handleImageSizeLoading = this.handleImageSizeLoading.bind(this);
  }

  state = {
    isLoading: false,
    small: smallDefaultState,
    medium: mediumDefaultState,
    big: bigDefaultState,
  };

  // Check if we did receive new "potential" image, if yes reset sizes, and their loading status to default
  componentWillReceiveProps({ isActive, path }) {
    if ((isActive && path !== this.props.path) || (isActive !== this.props.isActive)) {
      this.setState({ small: smallDefaultState, medium: mediumDefaultState, big: bigDefaultState });
    }
  }

  // Load stack of images progressively, one after another
  progressiveLoad(e) {
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
  }

  // Help us load appropriate image size
  handleImageSizeLoading(setAttr, path, imageSize) {
    // which size we will load now?
    const which = this.state[imageSize];

    // replace src attribute with pattern & mark pattern as loaded
    setAttr(which.pattern(path));
    this.setState({ [imageSize]: { loaded: true } });
  }

  render() {
    const { className, role, alt, src } = this.props;

    return (
      <img
        src={src}
        alt={alt}
        role={role}
        className={className}
        onLoad={this.progressiveLoad}
      />
    );
  }
}

ProgressiveImage.propTypes = {
  src: ptype.string,
  alt: ptype.string,
  path: ptype.string,
  role: ptype.string,
  isActive: ptype.bool,
  className: ptype.string,
};

export default ProgressiveImage;
