import { expect } from 'chai';
import movieSearchFormReducer from '../reducer';
import { fromJS } from 'immutable';

describe('movieSearchFormReducer', () => {
  it('returns the initial state', () => {
    const excepted = fromJS({});
    expect(movieSearchFormReducer(undefined, {})).to.eql(excepted);
  });
});
