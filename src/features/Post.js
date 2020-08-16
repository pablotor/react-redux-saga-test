import React, { useState } from 'react';

export function Post(props) {

  const [showContent, setShowContent] = useState(false);

  return (
    <div className="post" onClick={() => setShowContent(!showContent)} >
      {props.post.title}
      {showContent &&
        <div className="post__content">
          {props.post.body}
        </div>
      }
    </div>
  );
}
