import { take, call, select, put } from 'redux-saga/effects';
import { MOOD_UPDATE, GENRE_UPDATE, FILTER_FORM_UPDATE} from 'containers/App/constants';
import { selectGenre, selectGenreList } from 'containers/App/selectors';
import { resultSet } from 'containers/App/actions';
import request from 'utils/request';
import _ from 'lodash';
import Chance from 'chance';
var retext = require('retext');
var nlcstToString = require('nlcst-to-string');
var keywords = require('retext-keywords');

retext().use(keywords).process(
  /* First three paragraphs on Term Extraction from Wikipedia:
   * http://en.wikipedia.org/wiki/Terminology_extraction */
  'Terminology mining, term extraction, term recognition, or ' +
  'glossary extraction, is a subtask of information extraction. ' +
  'The goal of terminology extraction is to automatically extract ' +
  'relevant terms from a given corpus.' +
  '\n\n' +
  'In the semantic web era, a growing number of communities and ' +
  'networked enterprises started to access and interoperate through ' +
  'the internet. Modeling these communities and their information ' +
  'needs is important for several web applications, like ' +
  'topic-driven web crawlers, web services, recommender systems, ' +
  'etc. The development of terminology extraction is essential to ' +
  'the language industry.' +
  '\n\n' +
  'One of the first steps to model the knowledge domain of a ' +
  'virtual community is to collect a vocabulary of domain-relevant ' +
  'terms, constituting the linguistic surface manifestation of ' +
  'domain concepts. Several methods to automatically extract ' +
  'technical terms from domain-specific document warehouses have ' +
  'been described in the literature.' +
  '\n\n' +
  'Typically, approaches to automatic term extraction make use of ' +
  'linguistic processors (part of speech tagging, phrase chunking) ' +
  'to extract terminological candidates, i.e. syntactically ' +
  'plausible terminological noun phrases, NPs (e.g. compounds ' +
  '"credit card", adjective-NPs "local tourist information office", ' +
  'and prepositional-NPs "board of directors" - in English, the ' +
  'first two constructs are the most frequent). Terminological ' +
  'entries are then filtered from the candidate list using ' +
  'statistical and machine learning methods. Once filtered, ' +
  'because of their low ambiguity and high specificity, these terms ' +
  'are particularly useful for conceptualizing a knowledge domain ' +
  'or for supporting the creation of a domain ontology. Furthermore, ' +
  'terminology extraction is a very useful starting point for ' +
  'semantic similarity, knowledge management, human translation ' +
  'and machine translation, etc.',
  function (err, file) {
    var space = file.namespace('retext');

    console.log('Keywords:');

    space.keywords.forEach(function (keyword) {
      console.log(nlcstToString(keyword.matches[0].node));
    });

    console.log();
    console.log('Key-phrases:');

    space.keyphrases.forEach(function (phrase) {
      console.log(phrase.matches[0].nodes.map(nlcstToString).join(''));
    });
  }
);

//
// // var retext = require('retext');
// // var nlcstToString = require('nlcst-to-string');
// // var keywords = require('retext-keywords');
//
// console.log(keywords);
// Individual exports for testing
export function* getRepos() {
  console.log(retext);
  // Select username from store
  const chance = new Chance();
  const genre = yield select(selectGenre());
  const genreUpperLetter = _.upperFirst(genre);
  const genreList = yield select(selectGenreList());
  const genreId = _.findIndex(genreList, ['name', genreUpperLetter]);

  if (genreId === -1) return console.warn(`Genre "${genre}" wasn't found in genreList`);

  const randomNumber = chance.integer({ min: 0, max: 250 });


  const Url = 'http://api.themoviedb.org/3/discover/movie?api_key=9dee05d48efe51f51b15cc63b1fee3f5';
  // console.log(genreId);
  const requestUrl = `${Url}&with_genres=${genreList[genreId].id}&page=${randomNumber}`;
  const movies = yield call(request, requestUrl);

  console.log(randomNumber);

  if (!movies.err) {
    yield put(resultSet(movies.data, movies.data.results[0]));
  }
}

export function* sagaName() {
  while (yield take(FILTER_FORM_UPDATE)) {
    yield call(getRepos);
  }
}

// Your sagas for this container
export default [
  sagaName,
];
