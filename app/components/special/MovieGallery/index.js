/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import { each } from 'lodash';
import React, { PropTypes as ptype, Component } from 'react';

import Section from 'components/general/Section';
import SwipeBlock from 'components/general/SwipeBlock';
import BlankImage from 'components/general/BlankImage';
import ResultImage from 'components/special/MovieResultImage';

import styles from './styles.css';


/**
 * MovieGallery
 * @desc Render Gallery and filters.
 */
class MovieGallery extends Component {
  state = {
    isFetching: false,
    activeIndex: [0],
  };

  componentWillReceiveProps(nextProps) {
    // nowy rezultat, wyzerowanie active index
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
    this.changeActiveSlideIndex(activeIndex)
  };

  handleNextSlide = (activeIndex) => {
    this.changeActiveSlideIndex(activeIndex)
  };

  changeActiveSlideIndex(nextIndex) {
    if (!this.state.activeIndex.includes(nextIndex)) {
      this.setState({ activeIndex: [...this.state.activeIndex, nextIndex] }); // it should collect all visited screens
    }
  }

  renderSomething = (limitedBackdrops) => (
    limitedBackdrops.map((item, index) => this.renderImage(item, index))
  )

  renderImages = () => {
    const { movie, isFetching } = this.props;

    let limitedBackdrops = [];
    const poster = {
      file_path: movie.poster_path,
    };

    if (!isFetching && movie.images) {
      limitedBackdrops = movie.images.backdrops.slice(0, 11);
      limitedBackdrops.unshift(poster);
      console.log(limitedBackdrops[0])
    }
    else if (!movie.images) {
      // TODO: Better Condition for our images, we should display this element
      // only when we dont have any images and we are sure we download next
      // result
      // limitedBackdrops = [poster]
    }

    return (
      <SwipeBlock
        swiperConfig={{
          observeParents: true,
          observer: true,
          lazyPreloaderClass: 'swiper-loading-indicator',
          lazyLoadingInPrevNext: false,
          nextButton: null,
          prevButton: null,
          lazyLoading: false,
          preloadImages: false,
          autoplay: 454400,
          grabCursor: true,
          slidesPerView: 1,
          spaceBetween: 0,
        }}
        className={styles.swipeBlock}
        onSwiperMount={this.handleMountSwiper}
        onNextSlide={this.handleNextSlide}
      >
        {this.renderSomething(limitedBackdrops)}
      </SwipeBlock>
    );
  };

  renderImage = (img, index) => {
    const isVisible = this.state.activeIndex.includes(index);
    return (
      img.file_path ? <ResultImage key={index} path={img.file_path} alt={'test'} picture={img} isLoaded={isVisible} /> : <BlankImage className={styles.blankImage} />
    );
  };


  render() {
    const { movie, isFetching } = this.props;
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
