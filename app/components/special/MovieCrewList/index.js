/**
 *
 * CrewList
 *
 */

import React from 'react';
import Section from 'components/general/Section';
import SingleCrew from 'components/special/MovieSingleCrew';

function MovieCrewList(props) {
  const {
    items,
  } = props;

  function renderSingle(item, index) {
    const {
      image,
      alt,
      title,
      sectionSize,
    } = item;
    return (
      <Section title={title} size={sectionSize} key={index}> <SingleCrew path={image} alt={alt} /> </Section>
    );
  }
  return (
    <div>
      {items.map(renderSingle)}
    </div>
  );
}

MovieCrewList.propTypes = {
  items: React.PropTypes.array,
};

export default MovieCrewList;
