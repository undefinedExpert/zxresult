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
 * TODO: Refactor error handling, it should not depend on returned message, instead use api call status
 */
class MovieDescription extends Component {
  state = {
    isRevealed: false,
  };

  handleOnClick = () => {
    this.setState({ isRevealed: !this.state.isRevealed });
  };

  renderDescription = () => {
    const key = this.state.isRevealed ? 'ON' : 'OFF';
    const preDesc = truncate(this.props.description, { length: this.props.limit, omission: '', separator: /,?\.* +/ });
    return (
      <span key={key} >
        {this.state.isRevealed ? this.props.description.replace(preDesc, '') : '...'}
      </span>
    );
  };

  render() {
    const {
      description,
      sectionSize = '1/1',
    } = this.props;

    const title = 'Description';
    const errMsg = 'Description isn\'t available';
    const errMsgReturnedByApi = 'No overview found.';

    const cs = styles.description;
    const key = this.state.isRevealed ? 'ON' : 'OFF';
    return (
      <Section size={sectionSize} title={title} className={cs}>
        <p onClick={this.handleOnClick}>
          {truncate(this.props.description, { length: this.props.limit, omission: '', separator: /,?\.* +/ })}
          <ReactCSSTransitionGroup
            className={styles.animation}
            transitionName="fade"
            transitionEnterTimeout={2000}
            transitionLeaveTimeout={1}
          >
            {description !== errMsgReturnedByApi ? this.renderDescription() : errMsg}
          </ReactCSSTransitionGroup>
        </p>
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
