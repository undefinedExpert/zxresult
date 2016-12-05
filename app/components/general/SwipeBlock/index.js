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

    this.swiper = this.createSwiper();

    if (config.loop) {
      this.swiper.on('onSlideChangeEnd', (swiper) => { swiper.fixLoop(); });
    }

    if (this.props.onSwiperMount) {
      this.props.onSwiperMount(this.swiper);
    }
  }

  componentWillUnmount() {
    if (this.swiper && this.swiper.params) {
      // this.swiper.destroy(); // TODO: Fix this, it has to be enabled if we want to cancel downloading of non visible images but causes errs
                                // when there is new result displayed (probably cause lazy load image swiping while
                                // dosen't exist anymore)
    }

    if (this.props.onSwiperUnmount) {
      this.props.onSwiperUnmount(this.swiper);
    }
  }

  formatChildren(children, config) {
    return React.Children.map(children, (child, index) => (<div className={config.slideClass} key={index}>{child}</div>));
  }

  createSwiper = () => {
    const config = merge(this.props.swiperConfig, this.swiperConfig);
    const pagination = config.pagination ? null : <div className="swiper-pagination"></div>;
    const btnNext = config.nextButton ? null : <div className="swiper-button-next"></div>;
    const btnPrev = config.prevButton ? null : <div className="swiper-button-prev"></div>;

    const children = this.formatChildren(this.props.children, config);

    const container = ReactDom.refs.swiperContainer;

    const content = (
      <div className={'swiper-container'} ref={(ref) => { this.swiperContainer = ref; }}>
        <div className={config.wrapperClass} >
          {children}
        </div>
        {pagination}
        {btnNext}
        {btnPrev}
      </div>
    );

    container.innerHTML = ReactDomServer.renderToStaticMarkup(content);

    return new Swiper(container.children[0], config);
  };

  render() {
    return (
      <div ref={(ref) => { this.swiperContainer = ref; }} className="react-swiper-component"></div>
    );
  }
}


SwipeBlock.propTypes = {
  children: ptype.node,
  swiperConfig: React.PropTypes.object,
  onSwiperMount: React.PropTypes.func,
  onSwiperUnmount: React.PropTypes.func,
};

export default SwipeBlock;
