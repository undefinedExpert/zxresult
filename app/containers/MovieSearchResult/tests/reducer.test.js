import { expect } from 'chai';
import movieSearchResultReducer from '../reducer';
import { fromJS } from 'immutable';

describe('movieSearchResultReducer', () => {
  it('returns the initial state', () => {
    const expected = {
      username: '',
    };

    expect(movieSearchResultReducer(undefined, {})).to.eql(fromJS(expected));
  });
});
