/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import React, { PropTypes as ptype } from 'react';

import Section from 'components/general/Section';
import MovieSingleCrew from 'components/special/MovieSingleCrew';
import LoadingIndicator from 'components/general/LoadingIndicator';

import styles from './styles.css';


/**
 * MovieCrewList
 * @desc Check if there is at least one CrewItem, if yes map & render our single Crew mate.
 */
function MovieCrewList({ items }) {
  /**
   * renderSingle
   * @desc Render Single Crew Component packed with section basing on provided data.
   */
  const renderSingle = (item, index = 0) => (
    <div className={styles.singleCrew} key={index}>
      {<MovieSingleCrew {...item} />}
    </div>
  );

  const renderList = () => {
    const director = items.crew.filter((item) => item.job === 'Director')[0];
    const limitedCast = items.cast.slice(0, 2);

    return (
      <div>
        {renderSingle(director)} {limitedCast.map((item, index) => renderSingle(item, index))}
      </div>
    );
  };

  const title = 'Crew';
  return (
    <Section size={'1/1'} title={title} className={styles.movieCrewList}>
      {!items ? <LoadingIndicator className={styles.loading} /> : renderList()}
    </Section>
  );
}

MovieCrewList.propTypes = {
  items: ptype.object,
};

export default MovieCrewList;
