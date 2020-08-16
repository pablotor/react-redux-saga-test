import { createSlice } from '@reduxjs/toolkit';

export const postlisterSlice = createSlice({
  name: 'postlister',
  initialState : {
    pending: false,
    posts: [],
    error: null
},
  reducers: {
    fetchPosts: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.pending = true;
      state.posts = [];
      state.error = null;
    },
    fetchPostsError: (state, action) => {
      state.pending = false;
      state.error = action.payload;
    },
    fetchPostsSuccess: (state, action) => {
      state.pending = false;
      state.posts = action.payload;
    },
  },
});

export const { fetchPosts, fetchPostsError, fetchPostsSuccess } = postlisterSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectPosts = state => state.postlister.posts;
export const selectPending = state => state.postlister.pending;
export const selectError = state => state.postlister.error;

export default postlisterSlice.reducer;
