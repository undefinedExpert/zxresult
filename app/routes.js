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
  const { injectReducer, injectSagas } = getHooks(store);

  return [
    {
      path: '/',
      name: 'home',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/HomePage/reducer'),
          System.import('containers/HomePage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, component]) => {
          //Tworzymy nowy kontener dla naszego stanu o nazwie 'home'
          injectReducer('home', reducer.default);
          renderRoute(component);
        });
        
        importModules.catch(errorLoading);
      },
    }, {
      path: '/result',
      name: 'movieSearchResult',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/MovieSearchResult/reducer'),
          System.import('containers/MovieSearchResult/sagas'),
          System.import('containers/MovieSearchResult')
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('movieSearchResult', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
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
