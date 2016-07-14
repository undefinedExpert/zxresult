/*
 *
 * BottomNavigation
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Button from 'components/Button';
import { filterFormUpdate } from 'containers/App/actions';
import { push } from 'react-router-redux';


export class BottomNavigation extends React.Component { // eslint-disable-line react/prefer-stateless-function
  routeToResult = () => {
    this.openRoute('/result');
  };

  openRoute = (route) => {
    this.props.changeRoute(route);
  };

  render() {
    return (
      <div>
        <Button handleRoute={this.props.filterUpdate}>Update filters</Button>
        <Button handleRoute={this.routeToResult}>Search</Button>
      </div>
    );
  }
}

BottomNavigation.propTypes = {
  filterUpdate: React.PropTypes.func,
  changeRoute: React.PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    changeRoute: (url) => dispatch(push(url)),
    filterUpdate: () => dispatch(filterFormUpdate()),
    dispatch,
  };
}
// Error with container generator, it generate mapDispatchToProps without the first argument
export default connect(null, mapDispatchToProps)(BottomNavigation);
