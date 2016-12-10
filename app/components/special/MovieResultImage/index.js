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
  render() {
    const {
      path,
      absolutePath,
    } = this.props;

    const size = 'w500';
    const photoPath = absolutePath || `http://image.tmdb.org/t/p/${size}${path}`;
    return (
      <div className={className(styles.resultImage)} >
        <div className={styles.imageContainer}>
          <img
            ref={image => { this.image = image; }}
            role="presentation"
            className={className(styles.image)}
            src={photoPath}
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
