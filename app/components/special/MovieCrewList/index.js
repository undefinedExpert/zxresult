/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import React, { PropTypes as ptype } from 'react';

import Section from 'components/general/Section';
import SingleCrew from 'components/special/MovieSingleCrew';

/**
 * @desc Render Single Crew Component packed with section basing on provided data.
 */
const renderSingle = (item, index) => {
  const {
    image,
    alt,
    title,
    sectionSize } = item;

  const errMsg = `${title} isn't available`;
  return (
    <Section title={title} size={sectionSize} key={index}>
      {title ? <SingleCrew path={image} alt={alt} /> : <p>{errMsg}</p>}
    </Section>
  );
};


/**
 * MovieCrewList
 * @desc Check if there is at least one CrewItem, if yes map & render our single Crew mate.
 */
function MovieCrewList({ items }) {
  return (
    <div>
      {items.length ? items.map((item, index) => renderSingle(item, index)) : null}
    </div>
    );
}

MovieCrewList.propTypes = {
  items: ptype.array,
};

export default MovieCrewList;
