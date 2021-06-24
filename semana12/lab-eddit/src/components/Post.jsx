import React from "react";
import {
  changePostVote, createPostVote, deletePostVote, getToken
} from "../api";
import { useGlobalGetters } from "../global/GlobalStates";
import useCoodinator from "../hooks/useCoordinator";

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
  const { getPosts } = useGlobalGetters();

  async function vote(direction) {
    try {
      const token = getToken();

      if (userVote === direction)
        await deletePostVote(id, token);

      else if (userVote)
        await changePostVote(direction, id, token);

      else
        await createPostVote(direction, id, token);

      getPosts();
    } catch (error) {
      alert(`Erro ao fazer o voto\n${error.response.dataa}`);
    }
  }

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
          <p onClick={() => vote(1)}>UP</p>
          <p>{voteSum || 0}</p>
          <p onClick={() => vote(-1)}>DOWN</p>
        </div>
        <p>{`${commentCount || 0} comentários`}</p>
      </footer>
    </article>
  );
}
