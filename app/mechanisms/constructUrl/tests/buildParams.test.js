/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import { expect } from 'chai';

import { cleanBy, iterateWithCleaner, constructParams, buildParams } from '../buildParams';


describe('buildUrl', () => {
  describe('cleanBy', () => {
    const fn = cleanBy;
    const fixtureActive = {
      id: 16,
      name: 'Animation',
      type: null,
    };
    const fixtureRef = {
      id: 'with_genres',
      type: 'should_not_be_included',
    };
    const result = {
      ref: {
        id: 'with_genres',
      },
      value: {
        id: 16,
      },
    };

    it('Should remove name and null values and return object with its value and ref', () => {
      const expected = fn(fixtureActive, fixtureRef);
      expect(expected).to.be.eql(result);
    });
  });

  describe('iterateWithCleaner', () => {
    const fn = iterateWithCleaner;
    const fixtureIterated = ['genre', 'trend'];
    const fixtureWhatValues = {
      genre: {
        active: {
          id: 16,
          name: 'Animation',
          type: null,
        },
        apiRef: {
          id: 'with_genres',
        },
      },
      trend: {
        active: {
          name: 'Popular',
          voteCountMax: null,
          voteCountMin: 300,
        },
        apiRef: {
          voteCountMax: 'eslotwinskiMax',
          voteCountMin: 'eslotwinskiMin',
        },
      },
    };
    const result = {
      trend: {
        ref: {
          voteCountMin: 'eslotwinskiMin',
        },
        value: {
          voteCountMin: 300,
        },
      },
      genre: {
        ref: {
          id: 'with_genres',
        },
        value: {
          id: 16,
        },
      },
    };

    it('should return object which contain active, paired filters with their api refs set', () => {
      const expected = fn(fixtureIterated, fixtureWhatValues);
      expect(expected).to.be.eql(result);
    });
  });

  describe('constructParams', () => {
    const fn = constructParams;
    const fixtureRandomPage = 50;
    const fixtureFilters = {
      genre: {
        active: {
          id: 16,
          name: 'Animation',
          type: null,
        },
        apiRef: {
          id: 'with_genres',
        },
      },
      trend: {
        active: {
          name: 'Popular',
          voteCountMax: null,
          voteCountMin: 300,
        },
        apiRef: {
          voteCountMax: 'eslotwinskiMax',
          voteCountMin: 'eslotwinskiMin',
        },
      },
      range: {
        pages: 0,
      },
    };

    it('should return object with params', () => {
      const result = {
        trend: {
          ref: {
            voteCountMin: 'eslotwinskiMin',
          },
          value: {
            voteCountMin: 300,
          },
        },
        genre: {
          ref: {
            id: 'with_genres',
          },
          value: {
            id: 16,
          },
        },
      };

      const expected = fn(fixtureFilters);
      expect(expected).to.be.eql(result);
    });

    it('should assign randomPage to params', () => {
      fixtureFilters.range.pages = 100;
      const result = {
        trend: {
          ref: {
            voteCountMin: 'eslotwinskiMin',
          },
          value: {
            voteCountMin: 300,
          },
        },
        genre: {
          ref: {
            id: 'with_genres',
          },
          value: {
            id: 16,
          },
        },
        page: fixtureRandomPage,
      };

      const expected = fn(fixtureFilters, {}, fixtureRandomPage);
      expect(expected).to.be.eql(result);
    });

    it('should assign higherParams with params, if need replace existing object (like page)', () => {
      const result = {
        trend: {
          ref: {
            voteCountMin: 'eslotwinskiMin',
          },
          value: {
            voteCountMin: 300,
          },
        },
        genre: {
          ref: {
            id: 'with_genres',
          },
          value: {
            id: 16,
          },
        },
        page: 1000,
      };

      const expected = fn(fixtureFilters, { page: 1000 }, fixtureRandomPage);
      expect(expected).to.be.eql(result);
    });
  });

  describe('buildParams', () => {
    const fn = buildParams;
    const fixtureFilters = {
      genre: {
        active: {
          id: 16,
          name: 'Animation',
          type: null,
        },
        apiRef: {
          id: 'with_genres',
        },
      },
      trend: {
        active: {
          name: 'Popular',
          voteCountMax: null,
          voteCountMin: 300,
        },
        apiRef: {
          voteCountMax: 'eslotwinskiMax',
          voteCountMin: 'eslotwinskiMin',
        },
      },
      range: {
        pages: 0,
      },
    };

    it('should assign params when withParams == true', () => {
      const expected = fn(fixtureFilters, {}, true);
      const result = {
        trend: {
          ref: {
            voteCountMin: 'eslotwinskiMin',
          },
          value: {
            voteCountMin: 300,
          },
        },
        genre: {
          ref: {
            id: 'with_genres',
          },
          value: {
            id: 16,
          },
        },
      };

      expect(expected).to.be.eql(result);
    });

    it('should return pure object', () => {
      const expected = fn(fixtureFilters, {}, false, 0);
      expect(expected).to.be.eql({});
    });
  });
});
