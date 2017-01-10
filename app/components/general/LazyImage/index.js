/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import React, { PropTypes as ptype, Component } from 'react';

import LoadingIndicator from 'components/general/LoadingIndicator';
import ProgressiveImage from 'components/general/ProgressiveImage';


/**
 * LazyImage
 * @desc Allow us to render lazy loaded image with progressive loading
 * TODO: handle condition where image does not contain size
 * helper: http://stackoverflow.com/questions/9815762/detect-when-an-image-fails-to-load-in-javascript
 * TODO: API endpoint shouldn't be hardcoded
 * FIXME: LoadingIndicator should be removed when image source is available, but img in w45
 * size is downloading so fast so we can't even see loading indicator. It should be
 * integrated more with progressive loading
 */
class LazyImage extends Component {
  constructor(...args) {
    super(...args);

    // FIXME: Find better way of binding methods into class for testing puproses
    // ES6 classes does not supports autobinding feature and using
    // spy on component.instance().method does not work
    this.lazyLoad = this.lazyLoad.bind(this);
    this.replaceLazyLoadImage = this.replaceLazyLoadImage.bind(this);
  }

  state = {
    src: null,
  };

  // Check if mounted image isActive (visible), if yes run lazyLoading
  // Also it won't run if there is no imagePlaceholder
  componentDidMount() {
    if (this.imagePlaceholder) {
      this.lazyLoad();
    }
  }

  // Check if we did receive new "potential" image, if yes run lazyLoad, important to mention
  // is fact that imagePlaceholder has to be available in view.
  componentDidUpdate(prevProps) {
    const { src } = prevProps;

    if (src !== this.props.src) {
      this.lazyLoad();
    }
  }

  // Stop image from being downloaded when new result occur
  componentWillUnmount() {
    if (!this.lazyLoadedImage) return;

    // Abort image loading
    this.lazyLoadedImage.setAttribute('src', '');
  }

  // help us with firstly loading fully image and then with displaying it
  lazyLoad() {
    const { src } = this.props;

    // smallest size

    // Start downloading the image
    this.lazyLoadedImage = new Image();
    this.lazyLoadedImage.setAttribute('src', src);

    // When new image will be downloaded, invoke replaceLazyLoadImage
    this.lazyLoadedImage.addEventListener('load', this.replaceLazyLoadImage());
  }

  // Handles swapping src of lazyloaded image with our imagePlaceholder
  replaceLazyLoadImage() {
    // Check if imagePlaceholder is still in view, and lazyLoadedImage exist
    if (this.imagePlaceholder && this.lazyLoadedImage) {
      // swap both placeholder and just loaded image src's
      const source = this.lazyLoadedImage.getAttribute('src');

      // Set src to new image source
      this.setState({ src: source });

      // Remove lazy loaded image
      this.lazyLoadedImage = null;
    }
  }

  render() {
    const { children, ...rest } = this.props;

    const childProps = {
      src: this.state.src ? this.state.src : null,
      ref: img => { this.imagePlaceholder = img; },
      ...rest,
    };
    const newChildren = React.cloneElement(children, childProps);

    return (
      <div>
        {this.state.src ? <LoadingIndicator /> : null}
        {newChildren}
      </div>
    );
  }
}

LazyImage.propTypes = {
  children: ptype.node,
  src: ptype.string.isRequired,
};

export default LazyImage;
