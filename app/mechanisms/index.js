/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import callApi from 'mechanisms/callToApi';
import { processMovieAnalyse as movieAnalyse, detectPending } from 'mechanisms/processMovie';


/**
 * @desc Description of each mechanism
 * @property callApi - Calls api
 * @property movieAnalyse - Ranks movies
 * @property detectPending - Detect if we can push movie from pending list
 */
export {
  callApi,
  movieAnalyse,
  detectPending,
};
