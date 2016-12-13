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
import LoadingIndicator from 'components/general/LoadingIndicator';

import styles from './styles.css';


/**
 * MovieResultImage
 * @desc Render single result image.
 * @return packed prop.children with title and appropriate grid size.
 * TODO: Progressive image loading
 */
class MovieResultImage extends Component {
  componentDidMount() {
    if (this.imagePlacholder && this.props.isActive) {
      this.loadImageHandler();
    }
  }

  componentWillReceiveProps({ isActive, path }) {
    if ((isActive && path !== this.props.path) || (isActive !== this.props.isActive)) {
      this.loadImageHandler();
    }
  }

  componentWillUnmount() {
    if (!this.lazyLoadedImage) return;
    this.lazyLoadedImage.setAttribute('src', '');
  }

  loadImageHandler = () => {
    const { path, absolutePath } = this.props;

    const size = 'w500';
    const photoPath = absolutePath || `http://image.tmdb.org/t/p/${size}${path}`;

    this.lazyLoadedImage = new Image();
    this.lazyLoadedImage.setAttribute('src', photoPath);

    this.lazyLoadedImage.addEventListener('load', this.handleOnLoad);
  };

  handleOnLoad = () => {
    if (this.imagePlacholder && this.lazyLoadedImage) {
      const source = this.lazyLoadedImage.getAttribute('src');
      this.imagePlacholder.setAttribute('src', source);
    }
  };

  render() {
    return (
      <div className={className(styles.resultImage)} >
        <div className={styles.imageContainer}>
          <img
            ref={image => { this.imagePlacholder = image; }}
            role="presentation"
            className={className(styles.image)}
          />
        </div>
      </div>
    );
  }
}

MovieResultImage.propTypes = {
  path: ptype.string,
  isActive: ptype.bool,
  absolutePath: ptype.string,
};

export default MovieResultImage;
