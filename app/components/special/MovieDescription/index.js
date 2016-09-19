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
  const title = 'Description';
  const errMsg = 'Description isn\'t available';
  const errMsgReturnedByApi = 'No overview found.';
  return (
    <Section size={sectionSize} title={title} className={styles.description}>
      <p>{description !== errMsgReturnedByApi ? truncate(description, { length: limit }) : errMsg}</p>
    </Section>
  );
}

MovieDescription.propTypes = {
  description: React.PropTypes.string,
  limit: React.PropTypes.number,
  sectionSize: React.PropTypes.string,
};

export default MovieDescription;
