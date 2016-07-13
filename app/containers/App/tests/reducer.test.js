import { expect } from 'chai';
import appReducer from '../reducer';
import { fromJS } from 'immutable';
import {
  updateFilterGenre,
  updateFilterMood,
  resultSet,
} from '../actions';

describe('appReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      isLogged: true,
      filters: {
        mood: fromJS({
          active: {
            id: 28,
            name: 'Action',
          },
          list: [],
        }),
        popularity: 'Classical',
        decade: '90s',
        genre: fromJS({
          active: {
            id: 28,
            name: 'Action',
          },
          list: [],
        }),
      },
      result: fromJS({
        movie: null,
        movies: null,
      }),
      user: {
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
    });
  });
  it('returns the initial state', () => {
    const excepted = state;
    expect(appReducer(undefined, {})).to.eql(excepted);
  });

  it('should handle the updateFilterMood action', () => {
    const fixture = 'eslotwinski';
    const expectedResult = state.setIn(['filters', 'mood'], fixture);
    expect(appReducer(state, updateFilterMood.active.request(fixture))).to.eql(expectedResult);
  });

  it('should handle the updateFilterGenre action', () => {
    const fixture = 'drama';
    const expectedResult = state.setIn(['filters', 'genre', 'active'], fixture);
    expect(appReducer(state, updateFilterGenre.active.request(fixture))).to.eql(expectedResult);
  });

  it('should handle the resultSet action', () => {
    const single = {};
    const multiple = [{}, {}];
    const expectedResult = state
      .setIn(['result', 'movie'], single)
      .setIn(['result', 'movies'], multiple);

    expect(appReducer(state, resultSet(multiple, single))).to.eql(expectedResult);
  });
});
