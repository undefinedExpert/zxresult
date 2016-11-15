/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import { createStructuredSelector, createSelector } from 'reselect';

import { updateFilterGenre, updateFilterDecade, updateFilterTrend, updateFilterKeyword, updateFilters } from './actions';
import { selectFilters } from './selectors';


function mapDispatch(dispatch) {
  return {
    onChangeGenre: (value) => dispatch(updateFilterGenre.active.request(value)),
    onChangeDecade: (value) => dispatch(updateFilterDecade.active.request(value)),
    onChangeTrend: (value) => dispatch(updateFilterTrend.active.request(value)),
    onChangeKeyword: (value) => dispatch(updateFilterKeyword.active.request(value)),
    getGenreList: () => dispatch(updateFilterGenre.list.request()),
    getUpdateFilters: () => dispatch(updateFilters.request()),
    onSubmitForm: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    },
    dispatch,
  };
}

function mapState() {
  return createSelector(
    selectFilters(),
    createStructuredSelector({
      keyword: ({ keyword }) => keyword,
      genre: ({ genre }) => genre,
      decade: ({ decade }) => decade,
      trend: ({ trend }) => trend,
    }),
  );
}

export {
  mapDispatch,
  mapState,
};
