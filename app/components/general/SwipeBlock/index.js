/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import { merge } from 'lodash';
import 'swiper/dist/css/swiper.css';
import ReactDom from 'react-dom';
import Swiper from 'swiper/dist/js/swiper.min';
import React, { PropTypes as ptype, Component } from 'react';

// import styles from './styles.css';


/**
 * SwipeBlock
 * @desc Creates swipeable area where user can iterate through items.
 * TODO: Remove swiper.js which base on jquery, use react compatible tool instead.
 */
class SwipeBlock extends Component {
  constructor(props) {
    super(props);

    this.swiperConfig = {
      slideClass: 'swiper-slide',
      slideActiveClass: 'swiper-slide-active',
      slideVisibleClass: 'swiper-slide-visible',
      slideDuplicateClass: 'swiper-slide-duplicate',
      slideNextClass: 'swiper-slide-next',
      slidePrevClass: 'swiper-slide-prev',
      wrapperClass: 'swiper-wrapper',
      bulletClass: 'swiper-pagination-bullet',
      bulletActiveClass: 'swiper-pagination-bullet-active',
      paginationHiddenClass: 'swiper-pagination-hidden',
    };
  }

  componentDidMount() {
    const config = this.swiperConfig;


    const config2 = merge(this.swiperConfig, this.props.swiperConfig);

    this.swiper = new Swiper(this.container.children[0], config2);

    if (config.loop) {
      this.swiper.on('onSlideChangeEnd', (swiper) => { swiper.fixLoop(); });
    }

    if (this.props.onSwiperMount) {
      this.props.onSwiperMount(this.swiper);
    }
    if (this.props.onNextSlide) {
      this.swiper.on('onTransitionStart', (swiper) => {
        this.props.onNextSlide(swiper.activeIndex);

      });
    }
  }

  shouldComponentUpdate(nextProps) {
    // if (nextProps.children !== this.props.children) {
    //   return true;
    // }
    //
    return true;
  }


  componentWillUpdate(nextProps) {
    if (nextProps.children.length !== this.props.children.length) {
      this.swiper.slideTo(0, 0);
    }
  }

  componentWillUnmount() {
    if (this.swiper && this.swiper.params) {
      this.swiper.destroy(); // TODO: Fix this, it has to be enabled if we want to cancel downloading of non visible images but causes errs
      // when there is new result displayed (probably cause lazy load image swiping while
      // dosen't exist anymore)
    }

    if (this.props.onSwiperUnmount) {
      this.props.onSwiperUnmount(this.swiper);
    }
  }

  formatChildren(children, config) {
    return children.map((child, index) => (<div className={config.slideClass} key={index}>{child}</div>));
  }

  createSwiper = () => {
    const config = merge(this.swiperConfig, this.props.swiperConfig);
    const pagination = config.pagination ? <div className="swiper-pagination"></div> : null;
    const btnNext = config.nextButton ? <div className="swiper-button-next"></div> : null;
    const btnPrev = config.prevButton ? <div className="swiper-button-prev"></div> : null;

    const children = this.formatChildren(this.props.children, config);

    const content = (
      <div className={this.props.className} ref={(c) => { this.container = c; }}>
        <div className={config.wrapperClass} >
          {children}
        </div>
        {pagination}
        {btnNext}
        {btnPrev}
      </div>
    );

    return content;
  };

  render() {
    return (
      <div ref={(c) => { this.container = c; }} className="react-swiper-component">
        {this.createSwiper()}
      </div>
    );
  }
}


SwipeBlock.propTypes = {
  children: ptype.node,
  className: ptype.string,
  swiperConfig: React.PropTypes.object,
  onSwiperMount: React.PropTypes.func,
  onNextSlide: React.PropTypes.func,
  onSwiperUnmount: React.PropTypes.func,
};

export default SwipeBlock;
