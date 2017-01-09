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
const smallDefaultState = convertToPattern(/p\/w154/g, 'p/w154');
const mediumDefaultState = convertToPattern(/p\/w154/g, 'p/w500');
const bigDefaultState = convertToPattern(/p\/w154/g, 'p/original');
export const sizesDefault = [mediumDefaultState, bigDefaultState];

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
  componentWillReceiveProps({ isActive, src }, {sizes}) {
    if ((isActive && src !== this.props.src) || (isActive !== this.props.isActive)) {
      this.setState({ sizes: sizesDefault, src: null });
    }

    // if (isActive !== this.props.isActive && this.state.src === null) {
    //   this.progressiveLoad()
    // }


  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.sizes.length === 0 && !this.props.onLoad()) {
      this.props.onLoad();
    }
  }

  // Load stack of images progressively, one after another
  progressiveLoad = () => {
    console.log('run progressiveLoad');
    const { sizes } = this.state;
    const { src } = this.props;

    if (sizes.length) {
      const whichToLoad = this.state.sizes[0](src);
      this.sizeLoading(whichToLoad);
    }

    if (this.props.onLoad && this.state.sizes.length > 2) {
      this.props.onLoad();
    }
  };

  errorHandler = () => {
    if (this.state.sizes.length) {
      this.progressiveLoad();
    }
    else {
      this.sizeLoading(this.props.src);
    }
  };

  sizeLoading(src) {
    const newSizes = this.state.sizes.slice(1);
    this.setState({ sizes: newSizes, src });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.isActive !== this.props.isActive) {
      return true;
    }

    else if (nextState.src !== this.state.src) {
      return true;
    }

    if (nextProps.src !== this.props.src) {
      return true;
    }

    return false;
  }

  render() {
    const { className, role, alt, src } = this.props;
    console.log('run render');

    // aktwnt sie zmienia, jednak on load juz byl wiec klops
    return (
      <img
        src={this.state.src ? this.state.src : src}
        alt={alt}
        role={role}
        className={className}
        onLoad={this.props.src ? this.progressiveLoad : null}
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
  onLoad: ptype.func,
};

export default ProgressiveImage;
