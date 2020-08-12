import { configureStore } from '@reduxjs/toolkit';
import postlisterReducer from '../features/postlister/postlisterSlice';

export default configureStore({
  reducer: {
    postlister: postlisterReducer,
  },
});
