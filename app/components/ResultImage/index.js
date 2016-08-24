/**
 *
 * ResultImage
 *
 */

import React from 'react';
import styles from './styles.css';
import { VelocityComponent } from 'velocity-react';
import { Mixin as tweenStateMixin } from 'react-tween-state';

class ResultImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isAnimationBegin: true, top: 0, bottom: 0, imageHeight: 0 };
  }


  imageLoad = (e) => {
    // TODO: Create scan animation
    console.log(e.target.offsetWidth);
  };

  render() {
    const {
      path,
      alt,
    } = this.props;
    console.log(this.state);
    return (
      <div className={styles.resultImage}>
        <VelocityComponent animation={{ opacity: this.state.isAnimationBegin ? 1 : 0 }} duration={1000}>
          <img
            onMouseEnter={this.whenMouseEntered}
            onMouseLeave={this.whenMouseLeft}
            onLoad={this.imageLoad}
            src={path}
            alt={alt}
          />
        </VelocityComponent>
      </div>
    );
  }
}

ResultImage.propTypes = {
  path: React.PropTypes.string,
  alt: React.PropTypes.string,
};

export default ResultImage;