import { push } from 'react-router-redux';
import { updateFilterGenre, filterFormUpdate, updateFilterDecade } from 'containers/App/actions';
import { createStructuredSelector, createSelector } from 'reselect';
import { selectFilters } from 'containers/App/selectors';

function mapDispatch(dispatch) {
  return {
    // onChangeMood: (evt) => dispatch(updateFilterMood(evt)),
    onChangeGenre: (value) => dispatch(updateFilterGenre.active.request(value)),
    onChangeDecade: (value) => dispatch(updateFilterDecade.active.request(value)),
    changeRoute: (url) => dispatch(push(url)),
    filterUpdate: () => dispatch(filterFormUpdate()),
    getGenreList: () => dispatch(updateFilterGenre.list.request()),
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
        mood: (state) => state.mood,
        genre: (state) => state.genre,
        decade: (state) => state.decade,
      }),
    ),
    ohio: () => 'ohio',
  });
}

export {
  mapDispatch,
  mapState,
};
