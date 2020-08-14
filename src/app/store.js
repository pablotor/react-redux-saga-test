import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import postlisterReducer from '../features/postlister/postlisterSlice';
import watchFetchPostsAsync from '../features/sagas'

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// linea para que sagaMiddleware funcione con el configureStore
// sacado de aca https://github.com/reduxjs/redux-toolkit/issues/282
const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

export default configureStore({
  reducer: {
    postlister: postlisterReducer,
  },
  middleware
});

// then run the saga
sagaMiddleware.run(watchFetchPostsAsync);
