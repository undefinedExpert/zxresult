/**
*
* MovieDescription
*
*/

import React from 'react';
import { truncate } from 'lodash';
import styles from './styles.css';
import Section from 'components/general/Section';

function MovieDescription(props) {
  const {
    description,
    limit,
    sectionSize = '1/1',
  } = props;
  return (
    <Section size={sectionSize} title={'Description'} className={styles.description}>
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
