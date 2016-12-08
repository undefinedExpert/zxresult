/**
 *  Components are imported in specific (scope based) order:
 *  1. Node_modules
 *  2. Application
 *  3. Module
 */

import callApi from 'mechanisms/callToApi';
import { processMovieAnalyse as movieAnalyse } from 'mechanisms/processMovie';
import { detectPending } from 'mechanisms/detectPending';
import { mapGenres } from 'mechanisms/filterGenresById';
import { createConstantTypes } from 'mechanisms/createConstantTypes';


/**
 * @desc Description of each mechanism
 * @property callApi - Calls api
 * @property movieAnalyse - Ranks movies
 * @property detectPending - Detect if we can push movie from pending list
 * @property mapGenres - Map genres ids with their names
 * @property createConstantTypes - Allows us to create Requested, Successed, Failured types from provided single constant
 */
export {
  callApi,
  movieAnalyse,
  detectPending,
  mapGenres,
  createConstantTypes,
};
