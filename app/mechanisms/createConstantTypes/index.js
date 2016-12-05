/**
*  Components are imported in specific (scope based) order:
*  1. Node_modules
*  2. Application
*  3. Module
*/

/**
* CreateConstantTypes
* @desc Extends each constant with "REQUEST", "SUCCESS", "FAILURE" fields / types.
*/
export function createConstantTypes(base) {
  const REQUEST = 'REQUEST';
  const SUCCESS = 'SUCCESS';
  const FAILURE = 'FAILURE';
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
    acc[type] = `${base}_${type}`; // eslint-disable-line
    return acc;
  }, {});
}

export default createConstantTypes;
