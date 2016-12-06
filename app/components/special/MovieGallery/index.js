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
 * @desc Render Gallery and filters.
 * TODO: Rename MovieGallery
 * TODO: Working Gallery, not just single image.
 * TODO: remove FilterForm container from this Component
 */
class MovieGallery extends Component {
  state = {
    isFetching: false,
  };

  shouldComponentUpdate(nextProps) {
    if (nextProps.movie.original_title !== this.props.movie.original_title) {
      return true;
    }

    else if (typeof this.props.movie.images !== typeof nextProps.movie.images) {
      return true;
    }

    return false;
  }

  renderImages = (images) => {
    const limitedBackdrops = images.backdrops.sort((a, b) => b.height - a.height).slice(0, 11);
    limitedBackdrops.unshift(images.posters[0]);

    return (
      <SwipeBlock
        swiperConfig={{
          observeParents: true,
          observer: true,
          lazyPreloaderClass: 'swiper-loading-indicator',
          lazyLoadingInPrevNext: false,
          nextButton: null,
          prevButton: null,
          lazyLoading: true,
          preloadImages: false,
          autoplay: 3500,
          grabCursor: true,
          slidesPerView: 'auto',
          spaceBetween: 0,
        }}
        className={styles.swipeBlock}
      >
        {limitedBackdrops.map((item, index) => this.renderImage(item, index, true))}
      </SwipeBlock>
    );
  };

  renderImage = (img, index, lazyLoading) => (
    img.file_path ? <ResultImage key={index} path={img.file_path} alt={'test'} lazyLoading={lazyLoading} /> : <BlankImage className={styles.blankImage} />
   );


  render() {
    const { movie, isFetching } = this.props;
    const cs = styles.gallery;
    return (
      <Section className={cs}>
        {!isFetching && movie.images ? this.renderImages(movie.images) : <div className={styles.loading} />}
      </Section>
    );
  }
}

MovieGallery.propTypes = {
  movie: ptype.object,
  isFetching: ptype.bool,
};

export default MovieGallery;
