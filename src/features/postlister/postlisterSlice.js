import { createSlice } from '@reduxjs/toolkit';

export const postlisterSlice = createSlice({
  name: 'postlister',
  initialState : {
    pending: false,
    posts: [],
    error: null
},
  reducers: {
    fetchPostsPending: state => {
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

export const { fetchPostsPending, fetchPostsError, fetchPostsSuccess } = postlisterSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const fetchPostsAsync = url => dispatch => {
  dispatch(fetchPostsPending());
  fetch(url)
  .then(res => res.json())
  .then(res => {
      if(res.error) {
          throw(res.error);
      } else
      dispatch(fetchPostsSuccess(res));
      return res;
  })
  .catch(error => {
      dispatch(fetchPostsError(error.name +': ' + error.message));
  })
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectPosts = state => state.postlister.posts;
export const selectPending = state => state.postlister.pending;
export const selectError = state => state.postlister.error;

export default postlisterSlice.reducer;
