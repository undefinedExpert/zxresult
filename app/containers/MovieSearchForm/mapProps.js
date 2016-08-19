import { push } from 'react-router-redux';
import { updateFilterGenre, filterFormUpdate, updateFilterDecade, updateFilterTrend, updateFilters } from 'containers/App/actions';
import { createStructuredSelector, createSelector } from 'reselect';
import { selectFilters } from 'containers/App/selectors';

function mapDispatch(dispatch) {
  return {
    onChangeGenre: (value) => dispatch(updateFilterGenre.active.request(value)),
    onChangeDecade: (value) => dispatch(updateFilterDecade.active.request(value)),
    onChangeTrend: (value) => dispatch(updateFilterTrend.active.request(value)),
    changeRoute: (url) => dispatch(push(url)),
    filterUpdate: () => dispatch(filterFormUpdate()),
    getGenreList: () => dispatch(updateFilterGenre.list.request()),
    getUpdateFilters: () => dispatch(updateFilters.request()),
    onSubmitForm: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    },
    dispatch,
  };
}

function mapState() {
  return createStructuredSelector({
    filters: createSelector(
      selectFilters(),
      createStructuredSelector({
        genre: (state) => state.genre,
        decade: (state) => state.decade,
        trend: (state) => state.trend,
      }),
    ),
    ohio: () => 'ohio',
  });
}

export {
  mapDispatch,
  mapState,
};
