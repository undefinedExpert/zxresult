import { expect } from 'chai';
import homePageReducer from '../reducer';
import { fromJS } from 'immutable';

describe('homePageReducer', () => {
  it('returns the initial state', () => {
    const excepted =  {
      secondHelloWorld: {
        siemanko: 'siema',
        siemankodwa: 'siema2',
      },
      username: 'siemankocotam',
    };

    expect(homePageReducer(undefined, {})).to.eql(fromJS(excepted));
  });
});
