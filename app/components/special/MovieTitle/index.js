/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import React, { PropTypes as ptype } from 'react';

import Section from 'components/general/Section';

import styles from './styles.css';


/**
 * MovieTitle
 * @desc Renders movie title
 * @param movieTitle - Movie title provided by data
 * @param sectionSize - Size of this section.
 * TODO: Make date working, it has to work on real data.
 */
function MovieTitle({ movieTitle, sectionSize = '1/1' }) {
  const title = 'Title';

  return (
    <Section size={sectionSize} title={title}>
      <h1 className={styles.title}>{movieTitle} <span className={styles.date}>(2016)</span></h1>
    </Section>
  );
}

MovieTitle.propTypes = {
  movieTitle: ptype.string,
  sectionSize: ptype.string,
};

export default MovieTitle;
