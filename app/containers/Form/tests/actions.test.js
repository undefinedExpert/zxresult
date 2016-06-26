import { expect } from 'chai';
import {
  defaultAction,
} from '../actions';
import {
  DEFAULT_ACTION,
} from '../constants';

describe('Form actions', () => {
  describe('Default Action', () => {
    it('has a type of DEFAULT_ACTION', () => {
      const text = 'ohio';
      const expected = {
        type: DEFAULT_ACTION,
        text,
      };
      expect(defaultAction(text)).to.be.equal(expected);
    });
  });
});
