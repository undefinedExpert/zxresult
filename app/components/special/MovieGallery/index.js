/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import { merge } from 'lodash';
import React, { PropTypes as ptype, Component } from 'react';

import Section from 'components/general/Section';
import SwipeBlock from 'components/general/SwipeBlock';
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

  renderImage = (img, index) => (
    <ResultImage key={index} path={img.file_path} alt={'test'} />
  );

  renderImages = (images) => {
    const poster = images.posters.splice(0, 1);
    const limitedBackdrops = images.backdrops.slice(0, 10);
    const mergedImages = poster.concat(limitedBackdrops);

    return (
      mergedImages.map((item, index) => this.renderImage(item, index))
    );
  };

  // console.log(mergedImages, poster);
  render() {
    const { movie } = this.props;

    const altMsg = 'poster';

    const cs = styles.gallery;

    return (
      <Section className={cs}>
        <SwipeBlock swiperConfig={{ pagination: null, nextButton: null, prevButton: null }}>
          {movie.images ? this.renderImages(movie.images) : <h1>loading</h1>}
        </SwipeBlock>
      </Section>
    );
  }
}

MovieGallery.propTypes = {
  path: ptype.string,
  alt: ptype.string,
  orientation: ptype.string,
};

export default MovieGallery;
