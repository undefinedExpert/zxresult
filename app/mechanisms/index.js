/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import callApi from 'mechanisms/callToApi';
import { processMovieAnalyse as movieAnalyse } from 'mechanisms/processMovie';
import { detectPending } from 'mechanisms/detectPending';
import { mapGenres } from 'mechanisms/MapGenresWithNames';


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
  mapGenres,
};
