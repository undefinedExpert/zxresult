/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import className from 'classnames';
import React, { PropTypes as ptype, Component } from 'react';

import { convertToPattern } from 'utils/hooks';
import LoadingIndicator from 'components/general/LoadingIndicator';

import styles from './styles.css';


/**
 * MovieResultImage
 * @desc Render single result image.
 * @return packed prop.children with title and appropriate grid size.
 */
class MovieResultImage extends Component {
  state = {
    isRevealed: false,
  };

  onClickHandler = () => {
    this.setState({ isRevealed: !this.state.isRevealed });
  };

  render() {
    const {
      path,
      absolutePath,
      lazyLoading
    } = this.props;

    const { isRevealed } = this.state;

    const photoPath = absolutePath || `http://image.tmdb.org/t/p/original${path}`;
    return (
      <div className={className(styles.resultImage, isRevealed ? styles.isRevealed : null)} onClick={this.onClickHandler}>
        <div className={styles.imageContainer}>
          <img
            role="presentation"
            className={className(styles.image, 'swiper-lazy')}
            data-src={lazyLoading ? photoPath : null}
            src={!lazyLoading ? photoPath : null}
          />
          <LoadingIndicator className="swiper-loading-indicator" style={{ 'background-image': 'none' }} />
        </div>
      </div>
    );
  }
}

MovieResultImage.propTypes = {
  path: ptype.string,
  absolutePath: ptype.string,
  lazyLoading: ptype.bool,
};

export default MovieResultImage;
