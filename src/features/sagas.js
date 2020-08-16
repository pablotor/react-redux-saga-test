import { call, put, takeEvery } from 'redux-saga/effects'
import {
  fetchPosts,
  fetchPostsError,
  fetchPostsSuccess
} from './postlister/postlisterSlice';

// Our worker Saga: will perform the async fetching task

function* fetchPostsAsync(action) {
  try {
    const data = yield call (fetch, action.payload);
    const parsedData = yield data.json();
    yield put (fetchPostsSuccess(parsedData));
  }
  catch (error) {
    yield put (fetchPostsError(error.name +': ' + error.message));
  }
};


// Our watcher Saga: spawn a new fetchPostsAsync task on each postlister/fetchPosts
export default function* watchFetchPosts() {
  yield takeEvery(fetchPosts().type, fetchPostsAsync)
}
