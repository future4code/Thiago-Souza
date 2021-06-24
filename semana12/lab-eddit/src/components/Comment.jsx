import React from "react";

export default function Comment(props) {
  const {
    body,
    username,
    voteSum
  } = props.comment;

  return (
    <article className="comment">
      <article>
        <p>{body}</p>
      </article>
      <footer>
        <h4>{username}</h4>
        <div className="vote">
          <p>UP</p>
          <p>{voteSum || 0}</p>
          <p>DOWN</p>
        </div>
      </footer>
    </article>
  );
}
