/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import { merge } from 'lodash';
import 'swiper/dist/css/swiper.css';
import Swiper from 'swiper/dist/js/swiper.min';
import React, { PropTypes as ptype, Component } from 'react';


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
    const config = merge(this.swiperConfig, this.props.swiperConfig);

    this.swiper = new Swiper(this.container.children[0], config);

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
    // we don't want to scroll to slide 0 until 'poster' (main photo is firstly loaded) will be available.
    // Help us with change our slide without 'ugly' blink effect.
    // do not remove thatuntil you implement new swipe solution.
    if (!nextProps.shouldLoadAndSlide && nextProps.children.length === 1 && this.swiper.realIndex !== 0) {
      return false;
    }

    return true;
  }

  componentDidUpdate() {
    // make slide to poster(index 0). Detect here if we downloaded poster and we are ready to slide
    if (this.props.shouldLoadAndSlide && this.swiper.index !== 1 && this.props.activeIndex === 1) {
      this.swiper.slideTo(0, 0);
    }

    if (this.props.startAutoplay) {
      this.swiper.startAutoplay();
    }
  }

  componentWillUnmount() {
    if (this.swiper && this.swiper.params) {
      this.swiper.destroy();
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
      <div ref={(container) => { this.container = container; }} className="react-swiper-component">
        {this.createSwiper()}
      </div>
    );
  }
}


SwipeBlock.propTypes = {
  children: ptype.node,
  className: ptype.string,
  activeIndex: ptype.number,
  shouldLoadAndSlide: ptype.bool,
  onNextSlide: React.PropTypes.func,
  startAutoplay: React.PropTypes.func,
  onSwiperMount: React.PropTypes.func,
  onSwiperUnmount: React.PropTypes.func,
  swiperConfig: React.PropTypes.object,
};

export default SwipeBlock;
