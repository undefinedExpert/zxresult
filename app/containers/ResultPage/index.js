/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import React, { PropTypes as ptype, Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector, createSelector } from 'reselect';

import Gallery from 'components/special/MovieGallery';
import { selectResult } from 'containers/RequestMovie/selectors';
import MovieArticle from 'components/special/MovieArticle';


export class ResultPage extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { active } = this.props;

    return (
      <section>
        <Gallery path={active.poster_path} alt={`${active.original_title}`} />
        <MovieArticle movie={active} />
      </section>
    );
  }
}

ResultPage.propTypes = {
  filterUpdate: ptype.func,
  filters: ptype.object,
  result: ptype.object,
  active: ptype.object,
};

const mapStateToProps = createSelector(
  selectResult(),
  createStructuredSelector({
    active: (state) => state.active,
  })
);

export default connect(mapStateToProps)(ResultPage);
