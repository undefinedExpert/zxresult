/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import className from 'classnames';
import React, { PropTypes as ptype, Component } from 'react';

import LoadingIndicator from 'components/general/LoadingIndicator';
import LazyImage from 'components/general/LazyImage';

import styles from './styles.css';


/**
 * MovieResultImage
 * @desc Render single result image.
 * @return packed prop.children with title and appropriate grid size.
 * TODO: handle condition where image does not contain size
 * helper: http://stackoverflow.com/questions/9815762/detect-when-an-image-fails-to-load-in-javascript
 */
class MovieResultImage extends Component {
  render() {
    return (
      <div className={className(styles.resultImage)} >
        <div className={styles.imageContainer}>
          <LazyImage
            path={this.props.path}
            absolutePath={this.props.absolutePath}
            isActive={this.props.isActive}
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
