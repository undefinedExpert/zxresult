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
 */
class MovieGallery extends Component {
  state = {
    isFetching: false,
    images: [],
  };

  componentWillReceiveProps(nextProps) {
    // if (nextProps.movie.images) {
    //   const backDrops = nextProps.movie.images.backdrops.sort((a, b) => b.height - a.height).slice(0, 11);
    //   backDrops.unshift({ file_path: nextProps.movie.poster_path });
    //
    //   this.setState({ images: backDrops });
    // }
    // else if(nextProps.movie !== this.props.movie) {
    //   const backDrops = [{ file_path: nextProps.movie.poster_path }];
    //   this.setState({ images: backDrops });
    // }
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


    return false;
  }

  renderImages = () => {
    const { movie, isFetching } = this.props;

    let limitedBackdrops = [];
    const poster = {
      file_path: movie.poster_path,
    };

    if (!isFetching && movie.images) {
      limitedBackdrops = movie.images.backdrops.sort((a, b) => b.height - a.height).slice(0, 11);
      limitedBackdrops.unshift(poster);
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
      >
        {limitedBackdrops.map((item, index) => this.renderImage(item, index))}
      </SwipeBlock>
    );
  };

  renderImage = (img, index) => (
    img.file_path ? <ResultImage key={index} path={img.file_path} alt={'test'} picture={img} /> : <BlankImage className={styles.blankImage} />
   );


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
