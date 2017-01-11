/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */
var StackBlur = require("stackblur-canvas");
import React, { PropTypes as ptype, Component } from 'react';

import { convertToPattern } from 'utils/hooks';


/**
 * ProgressiveImage
 * @desc Allow us to load image with progressive loading solution
 */
class ProgressiveImage extends Component {
  state = {
    src: this.props.src,
    sizes: this.convertSizesToPatterns(this.props.sizes, this.props.sizes[0]),
  };

  componentWillReceiveProps(nextProps) {
    // Reset properties and break image downloading
    if (nextProps.src !== this.props.src) {
      this.setState(({ sizes: this.convertSizesToPatterns(nextProps.sizes, nextProps.sizes[0]), src: null }));
      this.placeholder.removeEventListener('load', this.updateSrc);
      this.lazyLoadedImage.setAttribute('src', '');
      this.placeholder.setAttribute('src', '');
    }
  }

  componentWillUnmount() {
    if (!this.lazyLoadedImage) return;

    // Abort image loading
    this.lazyLoadedImage.setAttribute('src', '');
    this.placeholder.removeEventListener('load', this.updateSrc);
  }

  convertSizesToPatterns(sizes, defaultSize) {
    const temp = [];
    const newSizes = sizes.filter(item => item !== defaultSize);

    newSizes.forEach((nextSize, index) => {
      const prevPattern = `p/${sizes[index]}`;
      const nextPattern = `p/${nextSize}`;

      temp.push(convertToPattern(prevPattern, nextPattern));
    });

    return temp;
  }

  // Load stack of images progressively, one after another
  progressiveLoad = () => {
      if (this.state.sizes.length > 0) {
        const path = this.state.src || this.props.src;
        const whichToLoad = this.state.sizes[0](path);

        this.lazyLoadedImage = new Image();
        this.lazyLoadedImage.src = whichToLoad;

        this.lazyLoadedImage.onload = this.updateSrc.bind(this);
      }

  };

  updateSrc = () => {
    // Temp hack for making swiper slides change working
    // Remove that at future
    if (this.props.onLoad && (this.props.sizes.length - this.state.sizes.length) === 1) this.props.onLoad();

    console.log('loading?');
    const path = this.state.src;
    const src = `${this.state.sizes[0](path)}`;

    this.setState((prevState) => ({
      sizes: prevState.sizes.slice(1),
      src,
    }));
  };

  formatChildren = () => {
    const { children } = this.props;
    const path = this.state.src;

    return React.Children.map(children, (child => React.cloneElement(child, { src: path, ref: (img) => { this.placeholder = img; }, onLoad: this.progressiveLoad })));
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
  src: ptype.oneOfType([
    ptype.string,
    ptype.null,
  ]),
  sizes: ptype.array.isRequired,
  onLoad: ptype.func,
  children: ptype.node.isRequired,
};

export default ProgressiveImage;
