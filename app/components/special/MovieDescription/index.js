/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import React, { PropTypes as ptype } from 'react';
import { truncate } from 'lodash';

import Section from 'components/general/Section';

import styles from './styles.css';


/**
 * MovieDescription
 * @desc Check if movie description exist, truncate it if yes, or display appropriate errMsh
 * TODO: Ability to show full description (when user clicks on it)
 * TODO: Refactor error handling, it should not depend on returned message, instead use api call status
 */
function MovieDescription(props) {
  const {
    description,
    limit,
    sectionSize = '1/1' } = props;

  const title = 'Description';
  const errMsg = 'Description isn\'t available';
  const errMsgReturnedByApi = 'No overview found.';

  const cs = styles.description;
  return (
    <Section size={sectionSize} title={title} className={cs}>
      <p>{description !== errMsgReturnedByApi ? truncate(description, { length: limit }) : errMsg}</p>
    </Section>
  );
}

MovieDescription.propTypes = {
  description: ptype.string,
  limit: ptype.number,
  sectionSize: ptype.string,
};

export default MovieDescription;
