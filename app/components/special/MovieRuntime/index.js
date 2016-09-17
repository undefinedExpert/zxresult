/**
*
* MovieRuntime
*
*/

import React from 'react';
import styles from './styles.css';
import { IoClock } from 'react-icons/lib/io/';
import Section from 'components/general/Section';

function MovieRuntime(props) {
  const {
    sectionSize = '1/2',
  } = props;
  return (
    <Section title={'Runtime'} size={sectionSize}>
      <span><IoClock className={styles.icon} size={50} /> 2h 31min</span>
    </Section>
  );
}

MovieRuntime.propTypes = {
  sectionSize: React.PropTypes.string,
};

export default MovieRuntime;
