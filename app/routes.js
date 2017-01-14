// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from './utils/hooks';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  // Create reusable async injectors using getHooks factory
  const { injectSagas } = getAsyncInjectors(store);

  return [
    {
      path: '/',
      name: 'home',
      getComponent(nextState, cb) {
        // Dirty styles importing, it allow us to 'load' styles before the user gets into the page.
        // Normally end user might see not styled components, most of them are loaded when each components 'mounts', so we are preloading them
        // when he comes to the route. It also breaks up hot-module-loading for those files.
        // TODO: Invent better solution for injecting styles directly from our components.
        // https://github.com/kriasoft/isomorphic-style-loader
        // https://github.com/dferber90/webapp/blob/master/knowhow/css-modules.md
        System.import('containers/HomePage/styles.css');
        System.import('containers/App/styles.css');
        System.import('containers/FilterForm/styles.css');
        System.import('components/general/SelectList/styles.css');
        System.import('components/general/Title/styles.css');
        System.import('components/general/Button/styles.css');
        System.import('components/special/WelcomeText/styles.css');
        System.import('components/general/Select/styles.css');

        const importModules = Promise.all([
          System.import('containers/RequestMovie/sagas'),
          System.import('containers/FilterForm/sagas'),
          System.import('containers/HomePage'),
        ]);

        const renderRoute = loadModule(cb);

        // Params matches the order in our Promise.all func
        importModules.then(([requestMovieSagas, filterFormSagas, component]) => {
          // injectReducer('global', reducer.default);
          injectSagas(requestMovieSagas.default.initial); // Inject the general app sagas
          injectSagas(filterFormSagas.default); // inject sagas specified for MovieSearchForm container

          renderRoute(component);
        });


        importModules.catch(errorLoading);
      },
    }, {
      path: '/result',
      name: 'result',
      getComponent(nextState, cb) {
        System.import('containers/ResultPage/styles.css');
        System.import('components/general/Section/styles.css');
        System.import('components/special/MovieArticle/styles.css');
        System.import('components/special/MovieCrewList/styles.css');
        System.import('components/special/MovieGenres/styles.css');
        System.import('components/special/MovieGallery/styles.css');
        System.import('components/special/MovieHeartRate/styles.css');
        System.import('components/special/MovieRuntime/styles.css');
        System.import('components/special/MovieSingleCrew/styles.css');
        System.import('components/special/MovieGenreIcons/styles.css');
        System.import('components/special/MovieResultImage/styles.css');
        System.import('components/special/MovieDescription/styles.css');

        // We import what we want
        const importModules = Promise.all([
          System.import('containers/RequestMovie/sagas'),
          System.import('containers/FilterForm/sagas'),
          System.import('containers/ResultPage'),
        ]);

        const renderRoute = loadModule(cb);

        // Params matches the order in our Promise.all func
        importModules.then(([requestMovieSagas, filterFormSagas, component]) => {
          // injectReducer('global', reducer.default);

          injectSagas(requestMovieSagas.default.result); // Inject the general app sagas
          injectSagas(filterFormSagas.default); // inject sagas specified for MovieSearchForm container

          renderRoute(component);
        });

        importModules.catch(errorLoading);
        // System.import('containers/MovieSearchResult')
        //   .then(loadModule(cb))
        //   .catch(errorLoading);
      },
    }, {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        System.import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
