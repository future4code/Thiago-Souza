import React from "react";
import { usePostStates } from "../global/PostStates";
import Comment from "./Comment";

export default function Comments() {
  const { data, loading, error } = usePostStates().comments;

  if (loading)
    return <p>Carregando Comentários</p>;

  if (error)
    return <p>Não Foi Possível Mostrar Os Comentários</p>;

  return (
    <section className="comments">
      {data.map((comment) => <Comment key={comment.id} comment={comment}/>)}
    </section>
  );
}
