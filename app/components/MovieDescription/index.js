/**
*
* MovieDescription
*
*/

import React from 'react';
import Section from 'components/Section';
// import styles from './styles.css';
import { truncate } from 'lodash';

function MovieDescription(props) {
  const {
    description,
    limit,
    sectionSize,
  } = props;
  return (
    <Section size={sectionSize} title={'Description'}>
      <p>{truncate(description, { length: limit })}</p>
    </Section>
  );
}

MovieDescription.propTypes = {
  description: React.PropTypes.string,
  limit: React.PropTypes.number,
  sectionSize: React.PropTypes.string,
};

export default MovieDescription;
