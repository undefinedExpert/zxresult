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
    const errMsg = `${title} isn't available`;
    return (
      <Section title={title} size={sectionSize} key={index}>
        {title ? <SingleCrew path={image} alt={alt} /> : <p>{errMsg}</p>}
      </Section>
    );
  }
  return (
    <div>
      {items.length ? items.map(renderSingle) : null}
    </div>
  );
}

MovieCrewList.propTypes = {
  items: React.PropTypes.array,
};

export default MovieCrewList;
