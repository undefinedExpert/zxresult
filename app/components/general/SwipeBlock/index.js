/**
*  Components are imported in specific (scope based) order:
*  1. Node_modules
*  2. Application
*  3. Module
*/

import { merge } from 'lodash';
import ReactDom from 'react-dom';
import ReactDomServer from 'react-dom/server';
import Swiper from 'swiper/dist/js/swiper.min';
import React, { PropTypes as ptype, Component } from 'react';
import 'swiper/dist/css/swiper.css';

// import styles from './styles.css';


const defaultSwiperConfig = {
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
  buttonDisabledClass: 'swiper-button-disabled',
};

/**
* SwipeBlock
* @desc TODO: desc for SwipeBlock
*/
class SwipeBlock extends Component {
  componentDidMount() {
    const config = this.props.swiperConfig;

    this.swiper = this.createSwiper();

    if (config.loop) {
      this.swiper.on('onSlideChangeEnd', (swiper) => { swiper.fixLoop(); });
    }

    if (this.props.onSwiperMount) {
      this.props.onSwiperMount(this.swiper);
    }
  }

  componentWillUnmount() {
    if (this.swiper) {
      this.swiper.destroy();
    }

    if (this.props.onSwiperUnmount) {
      this.props.onSwiperUnmount(this.swiper);
    }
  }

  props = {
    swiperConfig: defaultSwiperConfig,
    containerClass: 'swiper-container',
  };

  formatChildren(children, config) {
    return React.Children.map(children, (child, index) => (<div className={config.slideClass} key={index}>{child}</div>));
  }

  createSwiper() {
    const config = merge(defaultSwiperConfig, this.props.swiperConfig);
    const pagination = config.hasOwnProperty('pagination') ? null : <div className="swiper-pagination"></div>;
    const btnNext = config.hasOwnProperty('nextButton') ? null : <div className="swiper-button-next"></div>;
    const btnPrev = config.hasOwnProperty('prevButton') ? null : <div className="swiper-button-prev"></div>;
    const scrollBar = config.hasOwnProperty('scrollbar') ? null : <div className="swiper-scrollbar"></div>;

    const children = this.formatChildren(this.props.children, config);
    const container = ReactDom.findDOMNode(this.refs.swiperContainer);

    const content = (
      <div className={this.props.containerClass} ref="swiperContainer">
        <div className={config.wrapperClass} >
          {children}
        </div>
        {pagination}
        {btnNext}
        {btnPrev}
        {scrollBar}
      </div>
    );

    container.innerHTML = ReactDomServer.renderToStaticMarkup(content);

    return new Swiper(container.children[0], config);
  }

  render() {
    return (
      <div ref="swiperContainer" className="react-swiper-component"></div>
    );
  }
}


SwipeBlock.propTypes = {
  children: ptype.node,
  swiperConfig: React.PropTypes.object,
  containerClass: React.PropTypes.string,
  onSwiperMount: React.PropTypes.func,
  onSwiperUnmount: React.PropTypes.func,
};

export default SwipeBlock;
