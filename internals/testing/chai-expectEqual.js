/**
 * Chai Plugin for testing redux saga combined with selector creator functions
 * This expectEqual is implemented like the implementation of expect (https://github.com/mjackson/expect)
 */
import whyNotStrictlyEqual from 'is-equal/why';

// FIXME: Chai has a problem with reselect, this is temp fix
// more information: https://github.com/chaijs/chai/issues/746
// and: https://github.com/chaijs/chai/issues/644
export function expectEqual(chai) {
  const { Assertion, util } = chai;
  const whyNotEqual = (a, b) =>
    (a == b ? '' : whyNotStrictlyEqual(a, b)); // eslint-disable-line

  const isEqual = (a, b) => whyNotEqual(a, b) === '';

  Assertion.addMethod('expectEqual', function(expected, msg) { // eslint-disable-line
    if (msg) {
      util.flag(this, 'message', msg);
    }
    util.expectTypes(this, ['object']);
    const actual = util.flag(this, 'object');
    this.assert(
      isEqual(actual, expected)
      , `expected #{this} to expectEqual #{exp}\n ${whyNotStrictlyEqual(actual, expected)}`
      , 'expected #{this} to not expectEqual #{exp}'
      , expected
      , this._obj // eslint-disable-line
      , !!util.flag(this, 'negate')
    );
  });
}

