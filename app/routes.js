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
        // We import what we want
        const importModules = Promise.all([
          System.import('containers/RequestMovie/sagas'),
          System.import('containers/FilterForm/sagas'),
          System.import('containers/HomePage'),
          System.import('containers/FilterForm/styles.css'), // Fix for swiper.js
        ]);

        const renderRoute = loadModule(cb);

        // Params matches the order in our Promise.all func
        importModules.then(([requestMovieSagas, filterFormSagas, component]) => {
          // injectReducer('global', reducer.default);
          injectSagas(requestMovieSagas.default); // Inject the general app sagas
          injectSagas(filterFormSagas.default); // inject sagas specified for MovieSearchForm container

          renderRoute(component);
        });


        importModules.catch(errorLoading);
      },
    }, {
      path: '/result',
      name: 'result',
      getComponent(nextState, cb) {
        // We import what we want
        const importModules = Promise.all([
          System.import('containers/RequestMovie/sagas'),
          System.import('containers/FilterForm/sagas'),
          System.import('containers/ResultPage'),
          System.import('containers/ResultPage/styles.css'), // Fix for swiper.js
        ]);

        const renderRoute = loadModule(cb);

        // Params matches the order in our Promise.all func
        importModules.then(([requestMovieSagas, filterFormSagas, component]) => {
          // injectReducer('global', reducer.default);
          injectSagas(requestMovieSagas.default); // Inject the general app sagas
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
