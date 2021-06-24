import React from "react";

export default function Post(props) {
  const {
    body,
    title,
    username,
    commentCount,
    voteSum
  } = props.post;

  return (
    <article className="post">
      <header>
        <h4>{username}</h4>
        <h3>{title}</h3>
      </header>
      <article>
        <p>{body}</p>
      </article>
      <footer>
        <div className="vote">
          <p>UP</p>
          <p>{voteSum || 0}</p>
          <p>DOWN</p>
        </div>
        <p>{`${commentCount || 0} comentários`}</p>
      </footer>
    </article>
  );
}
