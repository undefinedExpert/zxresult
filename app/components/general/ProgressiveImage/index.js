/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import { isArray } from 'lodash';
import React, { PropTypes as ptype, Component } from 'react';

import { convertToPattern } from 'utils/hooks';


/**
 * @desc Default values for image size loaders. loaded is a representation of: Is this image size is loaded?
 * Pattern is a function which replace specific part of URL, so we could download bigger image.
 * TODO: sizes sets should not be hardcoded
 */
const mediumDefaultState = convertToPattern(/p\/w154/g, 'p/w500');
const bigDefaultState = convertToPattern(/p\/w154/g, 'p/original');
export const sizesDefault = [mediumDefaultState, bigDefaultState];

/**
 * ProgressiveImage
 * @desc Allow us to load image with progressive loading solution
 */
class ProgressiveImage extends Component {
  state = {
    src: this.props.src,
    sizes: this.convertSizesToPatterns(this.props.sizes, this.props.sizes[0]),
    ref: this.props.ref,
  };

  componentDidMount() {
    if (this.state.sizes.length) {
      this.placeholder.addEventListener('load', this.progressiveLoad.bind(this));
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.src !== this.props.src) {
      this.setState(({ sizes: this.convertSizesToPatterns(nextProps.sizes, nextProps.sizes[0]), src: nextProps.src }));
    }
  }

  componentWillUnmount() {
    this.placeholder.removeEventListener('load', this.progressiveLoad);
  }

  convertSizesToPatterns(sizes, defaultSize) {
    const temp = [];
    const newSizes = sizes.filter(item => item !== defaultSize);

    newSizes.forEach((nextSize) => {
      const prevPattern = `p/${defaultSize}`;
      const nextPattern = `p/${nextSize}`;

      temp.push(convertToPattern(prevPattern, nextPattern));
    });

    return temp;
  }

  // Load stack of images progressively, one after another
  progressiveLoad = () => {
    const { sizes } = this.state;
    const { src } = this.props;

    if (sizes.length > 0) {
      const whichToLoad = this.state.sizes[0](src);
      this.updateSrc(whichToLoad);
    }
  };

  updateSrc = (src) => {
    this.setState((prevState) => ({ sizes: prevState.sizes.slice(1), src }));
  };

  formatChildren = () => {
    const { src } = this.state;
    const { children } = this.props;

    return React.Children.map(children, (child => React.cloneElement(child, { src, ref: (img) => { this.placeholder = img; } })));
  };

  render() {
    const newChildren = this.formatChildren();
    return (
      <div>
        {newChildren}
      </div>
    );
  }
}

ProgressiveImage.propTypes = {
  src: ptype.string.isRequired,
  children: ptype.node.isRequired,
  sizes: ptype.array.isRequired,
};

export default ProgressiveImage;
