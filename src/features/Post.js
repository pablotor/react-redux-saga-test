import React, { useState } from 'react';

export function Post(props) {

  const [showContent, setShowContent] = useState(false);

  const handleClick = (e) => setShowContent(!showContent);
  
  return (
    <div className="post" key={props.post.id} onClick={handleClick}>
      {props.post.title}
      {showContent &&
        <div className="post__content">
          {props.post.body}
        </div>
      }
    </div>
  );
}
