/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import { connect } from 'react-redux';
import className from 'classnames';
import React, { PropTypes as ptype, Component } from 'react';
import { createStructuredSelector, createSelector } from 'reselect';

import FilterForm from 'containers/FilterForm';
import Gallery from 'components/special/MovieGallery';
import MovieArticle from 'components/special/MovieArticle';
import { selectResult } from 'containers/RequestMovie/selectors';

import styles from './styles.css';


export class ResultPage extends Component { // eslint-disable-line react/prefer-stateless-function
  state = {
    formHeight: null,
  };

  componentDidMount() {
    this.navMarginTop();
    window.addEventListener('resize', this.navMarginTop.bind(this));
  }

  componentWillUpdate() {
    this.navMarginTop();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.navMarginTop);
  }

  navMarginTop() {
    console.log(this);
    const formHeight = this.mobileNavigation ? this.mobileNavigation.getElementsByTagName('Form')[0].clientHeight : false;
    if (formHeight !== false && formHeight !== this.state.formHeight) {
      this.setState({ formHeight });
    }
  }

  render() {
    const { active, isFetching } = this.props;
    const { formHeight } = this.state;

    console.log(formHeight);
    return (
      <section >
        <div className={className(styles.halfWrapper, styles.gallery)}>
          <Gallery movie={active} isFetching={isFetching} />
          <FilterForm orientation={'horizontal'} />
        </div>
        <div className={className(styles.halfWrapper, styles.article)}>
          <MovieArticle movie={active} />
          <div ref={(c) => { this.mobileNavigation = c; }} className={styles.mobileFilterForm} style={{height: formHeight }}>
            <FilterForm orientation={'horizontal'} />
          </div>
        </div>
      </section>
    );
  }
}

ResultPage.propTypes = {
  active: ptype.object,
  isFetching: ptype.bool,
};

const mapStateToProps = createSelector(
  selectResult(),
  createStructuredSelector({
    active: (state) => state.active,
    isFetching: (state) => state.isFetching,
  })
);

export default connect(mapStateToProps)(ResultPage);
