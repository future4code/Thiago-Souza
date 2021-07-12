import React from "react";
import useUpdateVoteComment from "../hooks/useUpdateVoteComment";

export default function Comment(props) {
  const {
    body,
    username,
    voteSum,
    userVote,
    id,
    postId
  } = props.comment;
  const { updateVote } = useUpdateVoteComment(id, postId, userVote);

  return (
    <article className="comment">
      <article>
        <p>{body}</p>
      </article>
      <footer>
        <h4>{username}</h4>
        <div className="vote" onClick={(event) => event.stopPropagation()}>
          <p onClick={() => updateVote(1)}>UP</p>
          <p>{voteSum || 0}</p>
          <p onClick={() => updateVote(-1)}>DOWN</p>
        </div>
      </footer>
    </article>
  );
}
