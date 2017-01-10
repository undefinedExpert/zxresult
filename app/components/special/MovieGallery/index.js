/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import React, { PropTypes as ptype, Component } from 'react';

import Section from 'components/general/Section';
import SwipeBlock from 'components/general/SwipeBlock';
import BlankImage from 'components/general/BlankImage';
import ResultImage from 'components/special/MovieResultImage';

import styles from './styles.css';


/**
 * MovieGallery
 * @desc Render Gallery.
 * TODO: Give user the power of turning off autoplay feature
 */
class MovieGallery extends Component {
  state = {
    activeIndex: [0],
    shouldSlideAndLoad: null,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.movie.original_title !== this.props.movie.original_title) {
      this.setState({ activeIndex: [0], shouldSlideAndLoad: null });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.movie.original_title !== this.props.movie.original_title) {
      return true;
    }

    else if (nextProps.movie.poster_path !== this.props.movie.poster_path) {
      return true;
    }

    else if (typeof this.props.movie.images !== typeof nextProps.movie.images) {
      return true;
    }

    else if (nextState.activeIndex !== this.state.activeIndex) {
      return true;
    }

    // Helper method for SwipeBlock, help SwipeBlock determine when poster image were loaded.
    else if (nextState.shouldSlideAndLoad !== this.state.shouldSlideAndLoad) {
      return true;
    }

    return false;
  }

  handleChangeIndex = (activeIndex) => {
    this.changeActiveSlideIndex(activeIndex);
  };

  changeActiveSlideIndex(nextIndex) {
    if (!this.state.activeIndex.includes(nextIndex)) {
      this.setState({ activeIndex: [...this.state.activeIndex, nextIndex] }); // it should collect all visited screens
    }
  }

  // Helper method for SwipeBlock, help SwipeBlock determine when poster image were loaded.
  shouldLoadAndSlide = () => {
    this.setState({ shouldSlideAndLoad: true });
  };

  swipeConfig = {
    observeParents: false,
    observer: true,
    lazyPreloaderClass: 'swiper-loading-indicator',
    lazyLoadingInPrevNext: false,
    nextButton: null,
    prevButton: null,
    lazyLoading: false,
    preloadImages: false,
    autoplay: 455500,
    grabCursor: true,
    slidesPerView: 1,
    spaceBetween: 0,
  };

  renderSwipeBlock = () => {
    const { movie } = this.props;
    const poster = {
      file_path: movie.poster_path,
      aspect_ratio: 0.666666666666667,
    };

    const backdrops = movie.images ? movie.images.backdrops : [];
    const limitedBackdrops = [poster, ...backdrops];

    const swipeBlockProps = {
      swiperConfig: this.swipeConfig,
      className: styles.swipeBlock,
      onSwiperMount: this.handleChangeIndex,
      onNextSlide: this.handleChangeIndex,
      startAutoplay: this.state.activeIndex.length === 1,
      shouldLoadAndSlide: this.state.shouldSlideAndLoad,
      activeIndex: this.state.activeIndex.length,
    };
    return (
      <SwipeBlock {...swipeBlockProps}>
        {this.renderChildren(limitedBackdrops)}
      </SwipeBlock>
    );
  };

  renderChildren = (limitedBackdrops) => (
    limitedBackdrops.map((item, index) => this.renderImage(item, index)).slice(0, 10)
  );

  renderImage = (img, index) => {
    const isActive = this.state.activeIndex.includes(index);
    return (
      <ResultImage onLoad={index === 0 ? this.shouldLoadAndSlide : null} key={index} image={img} isActive={isActive} />
    );
  };

  render() {
    const { movie } = this.props;
    const cs = styles.gallery;

    return (
      <Section className={cs}>
        {this.renderSwipeBlock(movie)}
      </Section>
    );
  }
}

MovieGallery.propTypes = {
  movie: ptype.object,
};

export default MovieGallery;
