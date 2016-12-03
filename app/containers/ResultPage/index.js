/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import { connect } from 'react-redux';
import React, { PropTypes as ptype, Component } from 'react';
import { createStructuredSelector, createSelector } from 'reselect';

import FilterForm from 'containers/FilterForm';
import Gallery from 'components/special/MovieGallery';
import MovieArticle from 'components/special/MovieArticle';
import { selectResult } from 'containers/RequestMovie/selectors';

import styles from './styles.css';


export class ResultPage extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { active, isFetching } = this.props;

    return (
      <section>
        {}
        <div className={styles.halfWrapper}>
          <Gallery movie={active} isFetching={isFetching} />
          <FilterForm orientation={'horizontal'} />
        </div>
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
    isFetching: (state) => state.isFetching,
  })
);

export default connect(mapStateToProps)(ResultPage);
