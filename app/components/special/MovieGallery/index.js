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
    isFetching: false,
    activeIndex: [0],
    shouldSlideAndLoad: false,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.movie.original_title !== this.props.movie.original_title) {
      this.setState({ activeIndex: [0], shouldSlideAndLoad: false });
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

    else if (nextState.shouldSlideAndLoad !== this.state.shouldSlideAndLoad) {
      return true;
    }

    return false;
  }

  handleMountSwiper = (activeIndex) => {
    this.changeActiveSlideIndex(activeIndex);
  };

  handleNextSlide = (activeIndex) => {
    this.changeActiveSlideIndex(activeIndex);
  };

  changeActiveSlideIndex(nextIndex) {
    if (!this.state.activeIndex.includes(nextIndex)) {
      this.setState({ activeIndex: [...this.state.activeIndex, nextIndex] }); // it should collect all visited screens
    }
  }

  // Helper method for SwipeBlock, help SwipeBlock determine when
  // poster image were downloaded.
  shouldLoadAndSlide = () => {
    this.setState({ shouldSlideAndLoad: true });
  };

  renderChildren = (limitedBackdrops) => (
    limitedBackdrops.map((item, index) => this.renderImage(item, index))
  );

  renderImages = () => {
    const { movie } = this.props;
    const poster = {
      file_path: movie.poster_path,
    };

    const backdrops = movie.images ? movie.images.backdrops : [];
    const limitedBackdrops = [poster, ...backdrops];

    return (
      <SwipeBlock
        swiperConfig={{
          observeParents: false,
          observer: true,
          lazyPreloaderClass: 'swiper-loading-indicator',
          lazyLoadingInPrevNext: false,
          nextButton: null,
          prevButton: null,
          lazyLoading: false,
          preloadImages: false,
          autoplay: movie.images ? 4500 : false,
          grabCursor: true,
          slidesPerView: 1,
          spaceBetween: 0,
        }}
        className={styles.swipeBlock}
        onSwiperMount={this.handleMountSwiper}
        onNextSlide={this.handleNextSlide}
        startAutoplay={this.state.activeIndex.length === 1}
        shouldLoadAndSlide={this.state.shouldSlideAndLoad}
        activeIndex={this.state.activeIndex.length}
      >
        {this.renderChildren(limitedBackdrops)}
      </SwipeBlock>
    );
  };

  renderImage = (img, index) => {
    const isActive = this.state.activeIndex.includes(index);
    return (
      img.file_path ? <ResultImage key={index} path={img.file_path} alt={'test'} isActive={isActive} onLoad={this.shouldLoadAndSlide} /> : <BlankImage className={styles.blankImage} />
    );
  };


  render() {
    const { movie } = this.props;
    const cs = styles.gallery;

    return (
      <Section className={cs}>
        {this.renderImages(movie)}
      </Section>
    );
  }
}

MovieGallery.propTypes = {
  movie: ptype.object,
  isFetching: ptype.bool,
};

export default MovieGallery;
