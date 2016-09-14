/**
 *
 * ResultImage
 *
 */

import React from 'react';
import styles from './styles.css';
import { VelocityComponent } from 'velocity-react';

class ResultImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isAnimationBegin: true, top: 0, bottom: 0, imageHeight: 0 };
  }

  imageLoad = (e) => {
    // TODO: Create scan animation
    console.log(e.target.offsetHeight);
  };

  render() {
    const {
      path,
      alt,
    } = this.props;
    console.log(styles);
    return (
      <div className={styles.resultImage}>
        <div className={styles.overlay}></div>
        <div
          onMouseEnter={this.whenMouseEntered}
          onMouseLeave={this.whenMouseLeft}
          onLoad={this.imageLoad}
          alt={alt}
          className={styles.image}
          style={{ backgroundImage: 'url(' + path + ')' }}
        />
      </div>
    );
  }
}

ResultImage.propTypes = {
  path: React.PropTypes.string,
  alt: React.PropTypes.string,
};

export default ResultImage;
