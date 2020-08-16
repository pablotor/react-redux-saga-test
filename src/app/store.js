import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
// uncomment to use logger middleware
//import logger from 'redux-logger';

import postlisterReducer from '../features/postlister/postlisterSlice';
import watchFetchPosts from '../features/sagas'

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// setup the middlewares array for configureStore
const middlewares = [sagaMiddleware];
//const middlewares = [sagaMiddleware, logger]; //test only!!!!

export default configureStore({
  reducer: {
    postlister: postlisterReducer,
  },
  middleware: middlewares
});

// then run the saga
sagaMiddleware.run(watchFetchPosts);
