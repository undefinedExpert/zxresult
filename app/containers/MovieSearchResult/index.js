/*
 *
 * MovieSearchResult
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Gallery from 'components/special/MovieGallery';
import { selectResult } from 'containers/App/selectors';
import MovieArticle from 'components/special/MovieArticle';
import { createStructuredSelector, createSelector } from 'reselect';

export class MovieSearchResult extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      result: {
        active,
      },
    } = this.props;

    return (
      <section>
        <Gallery path={active.poster_path} alt={`${active.original_title}`} />
        <MovieArticle movie={active} />
      </section>
    );
  }
}

MovieSearchResult.propTypes = {
  filterUpdate: React.PropTypes.func,
  filters: React.PropTypes.object,
  result: React.PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  result: createSelector(
    selectResult(),
    createStructuredSelector({
      active: (state) => state.active,
    })
  ),
});

function mapDispatchToProps() {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieSearchResult);
