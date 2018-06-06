import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import {
    loadTranslations,
    setLocale,
    syncTranslationWithStore
} from 'react-redux-i18n';

import logger from 'common/src/middleware/LoggerMiddleware.js';
import reducers from './Reducers.js';
import rootSaga from './Sagas.js';
import translationsObject from './i18n/I18n.js';

import loader from 'common/src/middleware/RestLoaderMiddleware.js';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
let middlewares = [thunk, sagaMiddleware, loader];
if (DEBUG) {
    middlewares = [logger, ...middlewares];
}
const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(...middlewares))
);
syncTranslationWithStore(store);
store.dispatch(loadTranslations(translationsObject));
store.dispatch(setLocale('en'));
const rootSagaTask = sagaMiddleware.run(rootSaga);
rootSagaTask.done.catch(function(err) {
    console.log('TODO Handle Error in Sagas', err);
});
export default store;
