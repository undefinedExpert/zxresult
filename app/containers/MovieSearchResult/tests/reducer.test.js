import expect from 'expect';
import movieSearchResultReducer from '../reducer';
import { fromJS } from 'immutable';

describe('movieSearchResultReducer', () => {
  it('returns the initial state', () => {
    expect(movieSearchResultReducer(undefined, {})).toEqual(fromJS({}));
  });
});
