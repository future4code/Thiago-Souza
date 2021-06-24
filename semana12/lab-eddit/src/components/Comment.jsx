import React from "react";
import {
  changeCommentVote, createCommentVote, deleteCommentVote, getToken
} from "../api";
import { usePostGetters } from "../global/PostStates";

export default function Comment(props) {
  const {
    body,
    username,
    voteSum,
    userVote,
    id
  } = props.comment;
  const { getComments } = usePostGetters();

  async function vote(direction) {
    try {
      const token = getToken();

      if (userVote === direction)
        await deleteCommentVote(id, token);

      else if (userVote)
        await changeCommentVote(direction, id, token);

      else
        await createCommentVote(direction, id, token);

      getComments();
    } catch (error) {
      alert(`Erro ao fazer o voto\n${error.response.dataa}`);
    }
  }

  return (
    <article className="comment">
      <article>
        <p>{body}</p>
      </article>
      <footer>
        <h4>{username}</h4>
        <div className="vote" onClick={(event) => event.stopPropagation()}>
          <p onClick={() => vote(1)}>UP</p>
          <p>{voteSum || 0}</p>
          <p onClick={() => vote(-1)}>DOWN</p>
        </div>
      </footer>
    </article>
  );
}
