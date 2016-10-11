// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getHooks } from 'utils/hooks';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  // Create reusable async injectors using getHooks factory
  const { injectSagas } = getHooks(store);

  return [
    {
      path: '/',
      name: 'home',
      getComponent(nextState, cb) {
        // We import what we want
        const importModules = Promise.all([
          System.import('containers/RequestMovie/sagas'),
          System.import('containers/MovieSearchForm/sagas'),
          System.import('containers/HomePage'),
        ]);

        const renderRoute = loadModule(cb);

        // Params matches the order in our Promise.all func
        importModules.then(([requestMovieSagas, searchFormSagas, component]) => {
          // injectReducer('global', reducer.default);
          injectSagas(requestMovieSagas.default); // Inject the general app sagas
          injectSagas(searchFormSagas.default); // inject sagas specified for MovieSearchForm container

          renderRoute(component);
        });


        importModules.catch(errorLoading);
      },
    }, {
      path: '/result',
      name: 'result',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          // System.import('containers/HomePage/reducer'),
          System.import('containers/HomePage/sagas'), // TODO: Create custom saga for result page.
          System.import('containers/MovieSearchResult'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([sagas, component]) => {
          // Tworzymy nowy kontener dla naszego stanu o nazwie 'home'
          // injectReducer('global', reducer.default);
          injectSagas(sagas.default); // Inject the saga

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
