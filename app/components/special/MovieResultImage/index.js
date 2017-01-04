/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import className from 'classnames';
import React, { PropTypes as ptype, Component } from 'react';

import LazyImage from 'components/general/LazyImage';

import styles from './styles.css';


class MovieResultImage extends Component {
  render() {
    return (
      <div className={className(styles.resultImage)} >
        <div className={styles.imageContainer}>
          <LazyImage
            role="presentation"
            path={this.props.path}
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
};

export default MovieResultImage;
