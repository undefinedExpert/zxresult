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
    if (this.image && this.props.isLoaded) {
      // debugger
      this.handleImageLoading();
    }
  }

  componentWillReceiveProps(nextProps) {
    if ((nextProps.isLoaded && nextProps.path !== this.props.path) || nextProps.isLoaded !== this.props.isLoaded) {
      this.handleImageLoading(this.image);
    }
  }

  componentWillUnmount() {
    if (!this.img) return;
    this.img.setAttribute('src', '');
  }

  handleImageLoading = (e) => {
    const { path } = this.props;
    const size = 'w500';
    const photoPath = `http://image.tmdb.org/t/p/${size}${path}`;

    this.img = new Image();
    this.img.setAttribute('src', photoPath);
    this.img.addEventListener('load', this.handleOnLoad)
  };

  handleOnLoad = () => {
    console.log('image loaded');
    if (this.image && this.img) {
      this.image.setAttribute('src', this.img.getAttribute('src'))
    }
  }

  render() {
    const {
      path,
      absolutePath,
      isLoaded,
    } = this.props;

    const size = 'original';
    const photoPath = absolutePath || `http://image.tmdb.org/t/p/${size}${path}`;
    return (
      <div className={className(styles.resultImage)} >
        <div className={styles.imageContainer}>
          <img
            ref={image => { this.image = image; }}
            role="presentation"
            className={className(styles.image)}
            data-src={isLoaded ? photoPath : null}
          />
        </div>
      </div>
    );
  }
}

MovieResultImage.propTypes = {
  path: ptype.string,
  absolutePath: ptype.string,
};

export default MovieResultImage;
