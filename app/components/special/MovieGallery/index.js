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
// import LoadingIndicator from 'components/general/LoadingIndicator';

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

  handleLoading = () => (
    <div>
      <ResultImage absolutepPath={'http://37.media.tumblr.com/tumblr_mbha9qWF401qcixnko4_500.gif'} alt={'test'} lazyLoading={false} />
    </div>
  );

  renderImages = (images) => {
    const limitedBackdrops = images.backdrops.sort((a, b) => b.height - a.height).slice(0, 11);
    limitedBackdrops.unshift(images.posters[0]);

    return (
      <SwipeBlock
        swiperConfig={{
          lazyPreloaderClass: 'swiper-loading-indicator',
          pagination: null,
          lazyLoadingInPrevNext: false,
          nextButton: null,
          prevButton: null,
          lazyLoading: true,
          preloadImages: false,
          autoplay: 33500,
          grabCursor: true,
          slidesPerView: 'auto',
        }}
      >
        {limitedBackdrops.map((item, index) => this.renderImage(item, index, true))}
      </SwipeBlock>
    );
  };

  renderImage = (img, index, lazyLoading) => (
    <ResultImage key={index} path={img.file_path} alt={'test'} lazyLoading={lazyLoading} />
  );


  render() {
    const { movie } = this.props;


    const cs = styles.gallery;
    return (
      <Section className={cs}>
          {movie.images ? this.renderImages(movie.images) : this.handleLoading()}
      </Section>
    );
  }
}

MovieGallery.propTypes = {
  movie: ptype.object,
};

export default MovieGallery;
