/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import React, { PropTypes as ptype } from 'react';
import { times } from 'lodash';
import classNames from 'classnames';
import { IoHeart } from 'react-icons/lib/io/';

import Section from 'components/general/Section';

import styles from './styles.css';


/**
 * renderSingleHeart
 * @desc Renders our single hearth.
 * @param index - Used as React key
 * @param type - Hearts contains 2 types: filled, unfilled. We have to choose which one will be used.
 */
export const renderSingleHeart = (index, type) => {
  const cs = classNames(styles.icon, styles[type]);
  return <IoHeart size={32} key={index} className={cs} type={type} />;
};


/**
 * renderMultipleHearts
 * @desc Render all required hearths both types. There is always 5 hearts to render.
 * @param range - How many hearths will render
 * @param average - What is the vote average, it is used to detect how many 'filled' hearts we wish to render
 */
export const renderMultipleHearts = (range, average) => {
  const numOfFilled = Math.round(average);
  const numOfUnfilled = Math.ceil(range - numOfFilled);
  return (
    <div>
      {times(numOfFilled, (index) => renderSingleHeart(index, 'filled'))}
      {times(numOfUnfilled, (index) => renderSingleHeart(index, 'unfilled'))}
    </div>
  );
};


/**
 * renderHearts
 * @desc Render all required hearths both types. There is always 5 hearts to render.
 * @param voteAverage - What is the vote average
 */
export const renderHearts = (voteAverage) => {
  const range = 5;
  const average = voteAverage / 2; // voteAverage is in 1-10 scale, we divide by half to render 1-5 hearths
  return (
    <div>
      {renderMultipleHearts(range, average)}
    </div>
  );
};


/**
 * MovieHeartRate
 * @desc Render vote system based on hearths, each filled hearth represent vote point,
 * unfilled ones represent the vote scale. If voteCount === 0 it will handle the error.
 *
 * @param votes - Contains voteCount and Vote average which are used in calculations
 * @param sectionSize - What is the default section size of MovieHearth rate,
 * It might be also be set in the parent Component
 */
const MovieHeartRate = ({ votes, sectionSize = '1/1' }) => {
  const {
    voteCount,
    voteAverage } = votes;

  const title = 'Rate';
  const errMsg = 'Rating isn\'t available';

  const cs = styles.heartRate;
  return (
    <Section size={sectionSize} title={title} className={cs}>
      {voteCount ? renderHearts(voteAverage) : <p>{errMsg}</p>}
    </Section>
  );
};

MovieHeartRate.propTypes = {
  votes: ptype.object,
  sectionSize: ptype.string,
};

export default MovieHeartRate;
