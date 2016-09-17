/**
*
* HeartRate
*
*/

import React from 'react';
import { times } from 'lodash';
import styles from './styles.css';
import classNames from 'classnames';
import { IoHeart } from 'react-icons/lib/io/';
import Section from 'components/general/Section';

class MovieHeartRate extends React.Component {
  renderHearts = (voteAverage) => {
    const voteRange = 5;
    const average = voteAverage / 2; // voteAverage contains scale 1-10,
                                     // we divide by half to render 1-5 hearths
    const filled = Math.round(average);
    const unfilled = Math.ceil(voteRange - filled); // Upscale unfilled hearts number,
                                                    // because the result might be float type,
                                                    // and we always want to render 5 hearts both types

    function renderMultipleHearts(type) {
      const className = classNames(
        styles.icon,
        type === 'unfilled' ? styles.unfilled : null,
      );
      // render multiple hearth icons depending on their type,
      return (times(type === 'unfilled' ? unfilled : filled, (index) => (
        <IoHeart size={32} key={index} className={className} />
      )));
    }
    return (
      <div>
        {renderMultipleHearts()}
        {renderMultipleHearts('unfilled')}
      </div>
    );
  };

  render() {
    const {
      votes: {
        voteCount,
        voteAverage,
      },
      sectionSize = '1/1',
    } = this.props;
    const title = 'Rate';
    const errMsg = 'Rating isn\'t available';
    return (
      <Section size={sectionSize} title={title} className={styles.heartRate}>
        {voteCount ? this.renderHearts(voteAverage) : <p>{errMsg}</p>}
      </Section>
    );
  }
}

MovieHeartRate.propTypes = {
  votes: React.PropTypes.object,
  sectionSize: React.PropTypes.string,
};

export default MovieHeartRate;
