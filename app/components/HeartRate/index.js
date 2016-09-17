/**
*
* HeartRate
*
*/

import React from 'react';
import styles from './styles.css';
import classNames from 'classnames';
import { times } from 'lodash';
import { IoHeart } from 'react-icons/lib/io/';
import Section from 'components/Section';

class HeartRate extends React.Component {
  renderHeart = (voteAverage) => {
    const average = voteAverage / 2; // voteAverage contains scale 1-10, so we divide by half to make it 1-5
    const voteRange = 5;
    const filled = Math.round(average);
    const unfilled = Math.ceil(voteRange - filled);

    function renderHearts(type) {
      return (times(type === 'unfilled' ? unfilled : filled, (index) => (
        <IoHeart size={32} key={index} className={type === 'unfilled' ? classNames(styles.heartRate, styles.unfilled) : styles.icon} />
      )));
    }

    return (
      <div>
        {renderHearts()}
        {renderHearts('unfilled')}
      </div>
    );
  };

  render() {
    const {
      votes: {
        voteAverage,
        voteCount,
      },
      sectionSize,
    } = this.props;

    return (
      <Section size={sectionSize} title={'Rate'} className={styles.heartRate}>
        {voteCount ? this.renderHeart(voteAverage) : <p>Rating isn't available</p>}
      </Section>
    );
  }
}

HeartRate.propTypes = {
  votes: React.PropTypes.object,
  msg: React.PropTypes.string,
  sectionSize: React.PropTypes.string,
};

export default HeartRate;
