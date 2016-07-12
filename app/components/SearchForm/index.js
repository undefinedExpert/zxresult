/**
*
* SearchForm
*
*/

import React from 'react';

import styles from './styles.css';
import { reduxForm } from 'redux-form';

class SearchForm extends React.Component {
  static propTypes = {
    fields: React.PropTypes.object.isRequired,
  };
  render() {
    const {
      fields: { name },
    } = this.props;
    return (
      <div className={styles.searchForm}>
        <input type="text" className="form-control" id={field.name} {...field}/>

      </div>
    );
  }
}

export default reduxForm({
  form: 'movieSearchForm',
  fields: ['name'],
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS(),
})(SearchForm);