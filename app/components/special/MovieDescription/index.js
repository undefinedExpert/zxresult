/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import { truncate } from 'lodash';
import React, { PropTypes as ptype, Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


import Section from 'components/general/Section';

import styles from './styles.css';


/**
 * MovieDescription
 * @desc Check if movie description exist, truncate it if yes, or display appropriate errMsh
 */
class MovieDescription extends Component {
  state = {
    isRevealed: false,
  };

  handleOnClick = () => {
    if (this.props.description.length < this.props.limit) return;

    this.setState({ isRevealed: !this.state.isRevealed });
  };

  truncateDesc = (desc) => truncate(desc, { length: this.props.limit, omission: '', separator: /,?\.* +/ });

  renderRevealedDescription = (shortDesc) => {
    const key = this.state.isRevealed ? 'ON' : 'OFF';
    return (
      <span key={key} >
        {this.state.isRevealed ? this.props.description.replace(shortDesc, '') : '... read more'}
      </span>
    );
  };

  renderDescription = (description) => {
    const shortDesc = description.length > this.props.limit ? this.truncateDesc(description) : description;
    return (
      <p onClick={this.handleOnClick}>
        {shortDesc}
        <ReactCSSTransitionGroup
          className={styles.animation}
          transitionName="fade"
          transitionEnterTimeout={200}
          transitionLeaveTimeout={100}
        >
          {description.length > this.props.limit ? this.renderRevealedDescription(shortDesc) : null}
        </ReactCSSTransitionGroup>
      </p>
    );
  };

  render() {
    const {
      sectionSize = '1/1',
      description,
    } = this.props;

    const title = 'Description';
    const errMsg = 'Description isn\'t available';
    const errMsgReturnedByApi = 'No overview found.';
    const cs = styles.description;
    return (
      <Section size={sectionSize} title={title} className={cs}>
          {description !== errMsgReturnedByApi ? this.renderDescription(description) : errMsg}
      </Section>
    );
  }
}

MovieDescription.propTypes = {
  description: ptype.string,
  limit: ptype.number,
  sectionSize: ptype.string,
};

export default MovieDescription;
