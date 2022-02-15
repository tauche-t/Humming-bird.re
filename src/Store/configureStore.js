import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from '../Reducer/index';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootSaga from '../Saga';

const loggerMiddleware = ({ dispatch, getState }) => (next) => (action) => {
  console.log(action);
  return next(action);
}

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware, loggerMiddleware];
const enhancer = process.env.NODE_ENV === 'production' ? compose(applyMiddleware(...middlewares)) : composeWithDevTools(applyMiddleware(...middlewares)); 

const store = createStore(rootReducer, enhancer);
store.sagaTask = sagaMiddleware.run(rootSaga)

export default store;
