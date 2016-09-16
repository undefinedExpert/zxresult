/**
 *
 * CrewList
 *
 */

import React from 'react';
import SingleCrew from 'components/SingleCrew';
import Section from 'components/Section';

function CrewList(props) {
  const {
    items,
  } = props;

  function renderSingle(item) {
    const {
      image,
      alt,
      title,
      sectionSize,
    } = item;
    return (
      <Section title={title} size={sectionSize}> <SingleCrew path={image} alt={alt} /> </Section>
    );
  }
  return (
    <div>
      {items.map(renderSingle)}
    </div>
  );
}

CrewList.propTypes = {};

export default CrewList;
