import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchPostsAsync,
  selectPosts,
  selectPending,
  selectError
} from './postlisterSlice';

class Post extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showContent: false
      };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.setState({showContent: !this.state.showContent });
  }

  render() {
    if (this.state.showContent){
      return (
        <div className="post" key={this.props.post.id} onClick={this.handleClick}>
          {this.props.post.title}
          <div className="post__content">
            {this.props.post.body}
          </div>
        </div>
      );
    }
    else {
      return (
        <div className="post" key={this.props.post.id} onClick={this.handleClick}>
          {this.props.post.title}
        </div>
      );
    }
  }
}

export function PostLister() {
  const getPosts = useSelector(selectPosts);
  const getPending = useSelector(selectPending);
  const getError = useSelector(selectError);
  const dispatch = useDispatch();
  const [apiUrl, setApiUrl] = useState('');

  let header = (
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
  );

  if (getError) {
    return (
      <div>
        {header}
        <div className="fb fb__1_3-main" id="app" >
          <p>An error was found trying to fetch the posts from the submited url.<br/>
          Details: {getError}</p>
        </div>
      </div>
    )
  }

  else if (getPending) {
    return (
      <div>
        {header}
        <div className="fb fb__1_3-main" id="app" >
          <p>Aca va el spinner</p>
        </div>
      </div>
    );
  }

  else if (getPosts === []) {
    return (
      <div>
        {header}
      </div>
    );
  }

  else {
    return (
      <div>
        {header}
        <div className="fb fb__1_3-main" id="app" >
          {getPosts.map(newPost => (
            <Post post = {newPost}/>
          ))}
        </div>
      </div>
    );
  }
}
