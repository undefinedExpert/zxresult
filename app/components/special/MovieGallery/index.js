/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import React, { PropTypes as ptype, Component } from 'react';

import Section from 'components/general/Section';
import SwipeBlock from 'components/general/SwipeBlock';
import ResultImage from 'components/special/MovieResultImage';
import LoadingIndicator from 'components/general/LoadingIndicator';

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

  handleLoading = (poster) => (
    <div>
      {this.renderImage(poster[0])}
      <LoadingIndicator className={styles.loading} />
    </div>
  );

  renderImages = (poster, images) => {
    const limitedBackdrops = images.backdrops.slice(0, 10);
    const mergedImages = poster.concat(limitedBackdrops);

    return (
      <SwipeBlock swiperConfig={{ lazyPreloaderClass: 'swiper-loading-indicator', pagination: null, lazyLoadingInPrevNext: false, nextButton: null, prevButton: null, lazyLoading: true, preloadImages: false, autoplay: 2000, grabCursor: true }}>
        {mergedImages.map((item, index) => this.renderImage(item, index))}
      </SwipeBlock>
    );
  };

  renderImage = (img, index) => (
    <ResultImage key={index} path={img.file_path} alt={'test'} />
  );


  render() {
    const { movie } = this.props;
    const poster = [{ file_path: movie.poster_path }];

    const cs = styles.gallery;
    return (
      <Section className={cs}>
          {movie.images ? this.renderImages(poster, movie.images) : this.handleLoading(poster)}
      </Section>
    );
  }
}

MovieGallery.propTypes = {
  movie: ptype.object,
};

export default MovieGallery;
