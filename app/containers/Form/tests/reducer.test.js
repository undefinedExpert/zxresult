import { expect } from 'chai';
import formReducer from '../reducer';
import { fromJS } from 'immutable';

describe('formReducer', () => {
  it('returns the initial state', () => {
    expect(formReducer(undefined, {})).toEqual(fromJS({}));
  });
});
