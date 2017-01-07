/**
*  Components are imported in specific (scope based) order:
*  1. Node_modules
*  2. Application
*  3. Module
*/

import React, { PropTypes as ptype, Component } from 'react';

import { convertToPattern } from 'utils/hooks';


/**
 * @desc Default values for image size loaders. loaded is a representation of: Is this image size is loaded?
 * Pattern is a function which replace specific part of URL, so we could download bigger image.
 * TODO: sizes sets should not be hardcoded
 */
const smallDefaultState = convertToPattern(/\w45/g, 'w154');
const mediumDefaultState = convertToPattern(/\w45/g, 'w500');
const bigDefaultState = convertToPattern(/\w45/g, 'original');
export const sizesDefault = [smallDefaultState, mediumDefaultState, bigDefaultState];

/**
* ProgressiveImage
* @desc Allow us to load image with progressive loading solution
 * TODO: Handle unsuccessfully size downloading
*/
class ProgressiveImage extends Component {
  state = {
    src: null,
    sizes: sizesDefault,
  };

  // Check if we did receive new "potential" image, if yes reset sizes, and their loading status to default
  componentWillReceiveProps({ isActive, src }) {
    if ((src !== this.props.src) || (isActive !== this.props.isActive)) {
      this.setState({ sizes: sizesDefault, src: null });
    }
  }

  // Load stack of images progressively, one after another
  progressiveLoad = () => {
    const { sizes } = this.state;
    const { src } = this.props;

    if (sizes.length) {
      const whichToLoad = this.state.sizes[0](src);
      this.sizeLoading(whichToLoad);
    }
  };

  sizeLoading(src) {
    const newSizes = this.state.sizes.slice(1);
    this.setState({ sizes: newSizes, src });
  }

  render() {
    const { className, role, alt, src } = this.props;

    return (
      <img
        src={this.state.src ? this.state.src : src}
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
  role: ptype.string,
  isActive: ptype.bool,
  className: ptype.string,
};

export default ProgressiveImage;
