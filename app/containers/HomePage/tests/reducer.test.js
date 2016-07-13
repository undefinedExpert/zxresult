import { expect } from 'chai';
import homePageReducer from '../reducer';
import { fromJS } from 'immutable';

describe('homePageReducer', () => {
  it('returns the initial state', () => {
    const excepted = fromJS({});
    expect(homePageReducer(undefined, {})).to.eql(excepted);
  });
});
