/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import React, { PropTypes as ptype } from 'react';
import { IoClock } from 'react-icons/lib/io/';

import Section from 'components/general/Section';
import LoadingIndicator from 'components/general/LoadingIndicator';

import styles from './styles.css';


/**
 * MovieRuntime
 * @desc Renders length of the movie with an icon
 * returns packed runtime section
 */
function MovieRuntime({ sectionSize = '1/2', time }) {

  const title = 'Runtime';
  return (
    <Section title={title} size={sectionSize}>
      <span className={styles.runtime}>
        <IoClock className={styles.icon} size={50} />
        {time ? `${time} mins` : <LoadingIndicator />}
      </span>
    </Section>
  );
}

MovieRuntime.propTypes = {
  sectionSize: ptype.string,
  time: ptype.number,
};

export default MovieRuntime;
