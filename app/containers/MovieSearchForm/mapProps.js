import { push } from 'react-router-redux';
import { updateFilterGenre, filterFormUpdate } from 'containers/App/actions';

function mapProps(dispatch) {
  return {
    // onChangeMood: (evt) => dispatch(updateFilterMood(evt)),
    onChangeGenre: (value) => dispatch(updateFilterGenre.active.request(value)),
    changeRoute: (url) => dispatch(push(url)),
    filterUpdate: () => dispatch(filterFormUpdate()),
    getGenreList: () => dispatch(updateFilterGenre.list.request()),
    onSubmitForm: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    },
    dispatch,
  };
}
export {
  mapProps,
};
