import { createStore, applyMiddleware, compose } from 'redux';
import creteSagaMiddleware from 'redux-saga';
import logger from 'dev/logger';

import rootSaga from 'sagas';
import rootReducer from 'reducers';

const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const initialState = {};

export default (serverSagas = null, sagaOptions = {}) => {
  let store = null;
  let middleware = null;

  const sagaMiddleware = creteSagaMiddleware();
  // applying saga middleware
  if (IS_PRODUCTION) {
    // apply saga middleware only
    middleware = applyMiddleware(sagaMiddleware);
  } else {
    // apply saga middleware and logger/devtools
    middleware = applyMiddleware(sagaMiddleware, logger);

    // enable devtools if browser extension is installed
    if (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__) { // eslint-disable-line
      middleware = compose(
        middleware,
        window.__REDUX_DEVTOOLS_EXTENSION__() // eslint-disable-line
      );
    }
  }

  store = createStore(
    rootReducer,
    initialState,
    middleware
  );

  sagaMiddleware.run(rootSaga);

  // enable hot module replacement for reducers
  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index').default; // eslint-disable-line global-require
      store.replaceReducer(nextRootReducer);
    });
  }

  return {
    store,
  };
};
