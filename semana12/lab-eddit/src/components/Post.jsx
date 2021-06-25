import React from "react";
import useCoodinator from "../hooks/useCoordinator";
import useUpdateVotePost from "../hooks/useUpdateVotePost";

export default function Post(props) {
  const {
    body,
    title,
    username,
    commentCount,
    voteSum,
    id,
    userVote
  } = props.post;
  const { goToPost } = useCoodinator();
  const { updateVote } = useUpdateVotePost(id, userVote);

  return (
    <article className="post" onClick={() => goToPost(id)}>
      <header>
        <h4>{username}</h4>
        <h3>{title}</h3>
      </header>
      <article>
        <p>{body}</p>
      </article>
      <footer>
        <div className="vote" onClick={(event) => event.stopPropagation()}>
          <p onClick={() => updateVote(1)}>UP</p>
          <p>{voteSum || 0}</p>
          <p onClick={() => updateVote(-1)}>DOWN</p>
        </div>
        <p>{`${commentCount || 0} comentários`}</p>
      </footer>
    </article>
  );
}
