/*
 *
 * ResultPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Gallery from 'components/special/MovieGallery';
import { selectResult } from 'containers/RequestMovie/selectors';
import MovieArticle from 'components/special/MovieArticle';
import { createStructuredSelector, createSelector } from 'reselect';

export class ResultPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      active
    } = this.props;

    return (
      <section>
        <Gallery path={active.poster_path} alt={`${active.original_title}`} />
        <MovieArticle movie={active} />
      </section>
    );
  }
}

ResultPage.propTypes = {
  filterUpdate: React.PropTypes.func,
  filters: React.PropTypes.object,
  result: React.PropTypes.object,
};

const mapStateToProps = createSelector(
  selectResult(),
  createStructuredSelector({
    active: (state) => state.active,
  })
);

function mapDispatchToProps() {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultPage);
