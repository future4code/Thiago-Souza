import React from "react";
import { usePostGetters, usePostStates } from "../global/PostStates";
import Comment from "./Comment";

export default function Comments() {
  const {
    data, loading, refetch, error, hasMoreComments
  } = usePostStates().comments;
  const { fetchNextPageComments } = usePostGetters();

  if (loading && !refetch)
    return <p>Carregando Comentários</p>;

  if (error)
    return <p>Não Foi Possível Mostrar Os Comentários</p>;

  let textLoadMore = "Carregar Mais Comentários";

  if (refetch)
    textLoadMore = "Carregando Comentários";
  else if (!hasMoreComments)
    textLoadMore = "Não Há Mais Comentários";

  return (
    <section className="comments">
      {refetch && <p>Recarregando Comentários</p>}
      {data.map((comment) => <Comment key={comment.id} comment={comment}/>)}
      <button onClick={fetchNextPageComments} disabled={refetch || !hasMoreComments}>
        {textLoadMore}
      </button>
    </section>
  );
}
