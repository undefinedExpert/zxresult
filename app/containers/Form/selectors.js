import { createSelector } from 'reselect';

/**
 * Direct selector to the form state domain
 */
const selectFormDomain = () => state => state.get('orm');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Form
 */

const selectForm = () => createSelector(
  selectFormDomain(),
  (substate) => {
    return {}; //This is where you need to add the state for the container
  }
);


export default selectForm;
export {
  selectFormDomain,
};
