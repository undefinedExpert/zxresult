import { fromJS } from 'immutable';
import { expect } from 'chai';

import {
  selectLocationState,
  selectFilters,
  selectUser,
  selectUsername,
  selectMood,
  selectGenre,
  selectGenreList,
  selectResult,
  selectSingleResult,
} from 'containers/App/selectors';

describe('selectLocationState', () => {
  it('should select route as a plain JS object', () => {
    const route = fromJS({
      locationBeforeTransitions: null,
    });
    const mockedState = fromJS({
      route,
    });
    expect(selectLocationState()(mockedState)).to.eql(route.toJS());
  });

  describe('selectFilters', () => {

    it('Should select mood', () => {
      const mood = 'sad';
      const mockedState = fromJS({
        filters: fromJS({
          mood,
        }),
      });

      expect(selectMood(mockedState)).to.eql(mood);
    });

    it('Should select genre', () => {

    });

    it('Should select genreList', () => {

    });
  });





});
