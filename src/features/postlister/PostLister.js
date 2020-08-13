import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchPostsAsync,
  selectPosts,
  selectPending,
  selectError
} from './postlisterSlice';
import { Post } from '../Post'

import logo from './logo.svg';

export function PostLister() {
  const getPosts = useSelector(selectPosts);
  const getPending = useSelector(selectPending);
  const getError = useSelector(selectError);
  const dispatch = useDispatch();
  const [apiUrl, setApiUrl] = useState('');

  return (
    <div>
      <header className="fb__1_2-header">
        <div className="fb fb__2_5-title header-content">
          <h1 id="header-title">Post Lister </h1>
        </div>
        <div className="fb fb__2_6-api-form header-content" id="submit-api" >
          Enter the URL with the posts in Json format:<br/>
          <input
            id="form-bar"
            type="text"
            aria-label="Enter the URL of the API"
            value={apiUrl}
            onChange={e => setApiUrl(e.target.value)}
          />
          <button
            id="input-button"
            onClick={() => dispatch(fetchPostsAsync((apiUrl) || "https://jsonplaceholder.typicode.com/posts"))}
          >
            Fetch
          </button>
        </div>
      </header>
      <div className="fb fb__1_3-main" id="app" >
      {getPending &&
        <img src={logo} className="App-spinner" alt="spinner" />
      }
      {getError &&
        <p>An error was found trying to fetch the posts from the submited url.<br/>
        Details: {getError}</p>
      }
      {getPosts !== [] &&
        getPosts.map(newPost => (
            <Post post = {newPost}/>
          ))
      }
      </div>
    </div>
  );
}
