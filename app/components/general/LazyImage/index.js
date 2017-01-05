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
 */
class LazyImage extends Component {
  state = {
    isLoading: false,
    src: null,
  };

  // Check if mounted image isActive (visible), if yes run lazyLoading
  // Also it won't run if there is no imagePlaceholder
  componentDidMount() {
    if (this.imagePlaceholder && this.props.isActive) {
      this.lazyLoad();
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
    this.lazyLoadedImage.addEventListener('load', this.replaceLazyLoadImage());
  };

  // Handles swapping src of lazyloaded image with our imagePlaceholder
  replaceLazyLoadImage() {
    // Check if imagePlaceholder is still in view, and lazyLoadedImage exist
    // FIXME: Does we really need to check this if?
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
    const { className, role, alt } = this.props;

    return (
      <div>
        {this.state.isLoading ? <LoadingIndicator /> : null}
        <ProgressiveImage
          src={this.state.src ? this.state.src : null}
          alt={alt}
          role={role}
          className={className}
          isLoaded={false}
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
