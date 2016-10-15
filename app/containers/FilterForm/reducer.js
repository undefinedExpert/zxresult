/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import { fromJS } from 'immutable';

import * as CONSTANT from './constants';


const currentYear = new Date().getFullYear();
const initialState = fromJS({
  sentence: 'ohio',
  trend: fromJS({
    active: null,
    list: fromJS([
      fromJS({
        name: 'Highly rated',
        voteAverageMin: 6.5,
        voteAverageMax: 10,
        voteCountMin: 70,
        voteCountMax: null,
      }),
      fromJS({
        name: 'Popular',
        voteAverageMin: null,
        voteAverageMax: null,
        voteCountMin: 300,
        voteCountMax: null,
      }),
      fromJS({
        name: 'Most Popular',
        voteAverageMin: null,
        voteAverageMax: null,
        voteCountMin: 700,
        voteCountMax: null,
      }),
      fromJS({
        name: 'Underestimated',
        voteAverageMin: 7,
        voteAverageMax: 10,
        voteCountMin: 50,
        voteCountMax: 200,
      }),
    ]),
    apiRef: fromJS({
      voteAverageMin: 'vote_average.gte',
      voteAverageMax: 'vote_average.lte',
      voteCountMax: 'vote_count.lte',
      voteCountMin: 'vote_count.gte',
    }),
  }),
  decade: fromJS({
    active: fromJS(null),
    list: fromJS([
      fromJS({
        name: '2010s',
        dateMin: '2010-01-01',
        dateMax: `${currentYear}-01-01`,
      }),
      fromJS({
        name: '2000s',
        dateMin: '2000-01-01',
        dateMax: '2009-01-01',
      }),
      fromJS({
        name: '1990s',
        dateMin: '1990-01-01',
        dateMax: '1999-01-01',
      }),
      fromJS({
        name: '1980s',
        dateMin: '1980-01-01',
        dateMax: '1989-01-01',
      }),
      fromJS({
        name: '1970s',
        dateMin: '1970-01-01',
        dateMax: '1979-01-01',
      }),
      fromJS({
        name: '1960s',
        dateMin: '1960-01-01',
        dateMax: '1969-01-01',
      }),
      fromJS({
        name: 'Older',
        dateMin: '1900-01-01',
        dateMax: '1959-01-01',
      }),
    ]),
    apiRef: fromJS({
      dateMin: 'primary_release_date.gte',
      dateMax: 'primary_release_date.lte',
    }),
  }),
  genre: fromJS({
    active: fromJS(null),
    list: fromJS([]),
    apiRef: fromJS({
      id: 'with_genres',
    }),
  }),
  range: fromJS({
    pages: 0,
    pagesCache: null,
    results: 0,
  }),
});


function searchFormReducer(state = initialState, action) {
  switch (action.type) {
    case CONSTANT.FILTER_DECADE.REQUEST:
      return state
        .setIn(['decade', 'active'], action.value);
    case CONSTANT.FILTER_TREND.REQUEST:
      return state
        .setIn(['trend', 'active'], action.value);
    case CONSTANT.FILTER_TREND_LIST.REQUEST:
      return state
        .setIn(['trend', 'list'], action.value);
    case CONSTANT.FILTER_GENRE.REQUEST:
      return state
        .setIn(['genre', 'active'], action.value);
    case CONSTANT.FILTER_GENRE_LIST.SUCCESS:
      return state
        .setIn(['genre', 'list'], action.value);
    case CONSTANT.UPDATE_FILTERS.SUCCESS:
      return state
        .setIn(['range', 'pages'], action.totalPages)
        .setIn(['range', 'results'], action.totalResults)
        .setIn(['range', 'pagesCache'], null);
    case CONSTANT.CACHE_RANDOMIZED_PAGE.REQUEST:
      return state
        .setIn(['range', 'pagesCache'], action.page);
    default:
      return state;
  }
}

export default searchFormReducer;
