/**
*
* MovieTitle
*
*/

import React from 'react';
import styles from './styles.css';
import Section from 'components/general/Section';

function MovieTitle(props) {
  const {
    movieTitle,
    sectionSize = '1/1',
  } = props;
  return (
    <Section size={sectionSize} title={'Title'}>
      <h1 className={styles.title}>{movieTitle} <span className={styles.date}>(2016)</span></h1>
    </Section>
  );
}

MovieTitle.propTypes = {
  movieTitle: React.PropTypes.string,
  sectionSize: React.PropTypes.string,
};

export default MovieTitle;
