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
 */
class MovieGallery extends Component {
  state = {
    isFetching: false,
    activeIndex: [0],
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.movie.original_title !== this.props.movie.original_title) {
      this.setState({ activeIndex: [0] });
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

  renderChildren = (limitedBackdrops) => (
    limitedBackdrops.map((item, index) => this.renderImage(item, index))
  );

  renderImages = () => {
    const { movie, isFetching } = this.props;

    const poster = {
      file_path: movie.poster_path,
    };

    let limitedBackdrops = [];

    if (!isFetching && movie.images) {
      limitedBackdrops = [poster, ...movie.images.backdrops];
    }

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
          autoplay: 4250,
          grabCursor: true,
          slidesPerView: 1,
          spaceBetween: 0,
        }}
        className={styles.swipeBlock}
        onSwiperMount={this.handleMountSwiper}
        onNextSlide={this.handleNextSlide}
      >
        {this.renderChildren(limitedBackdrops)}
      </SwipeBlock>
    );
  };

  renderImage = (img, index) => {
    const isActive = this.state.activeIndex.includes(index);
    return (
      img.file_path ? <ResultImage key={index} path={img.file_path} alt={'test'} picture={img} isActive={isActive} /> : <BlankImage className={styles.blankImage} />
    );
  };


  render() {
    const { movie } = this.props;
    console.log(this.props)
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
