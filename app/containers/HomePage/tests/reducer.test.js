import { expect } from 'chai';
import homePageReducer from '../reducer';
import { fromJS } from 'immutable';

describe('homePageReducer', () => {
  it('returns the initial state', () => {
    const excepted = {
      isLogged: true,
      filters: {
        mood: 'Sad',
        trend: 'Classical',
        decade: '90s',
      },
      username: {
        name: 'Emanuel',
        avatar: 'https://avatars0.githubusercontent.com/u/5350669?v=3&s=460',
        watchList: [
          {
            name: 'Titanic',
            decade: '90s',
            rating: 86,
            popularity: 90,
          },
        ],
      },
    };

    expect(homePageReducer(undefined, {})).to.eql(fromJS(excepted));
  });
});
