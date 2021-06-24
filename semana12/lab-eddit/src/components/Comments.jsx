import React from "react";
import { useGetPostsComments } from "../hooks/useGetPostsComments";
import Comment from "./Comment";

export default function Comments(props) {
  const { comments, loading, error } = useGetPostsComments(props.id);
  if (loading)
    return <p>Carregando Comentários</p>;

  if (error)
    return <p>Não Foi Possível Mostrar Os Comentários</p>;

  return (
    <section className="comments">
      {comments.map((comment) => <Comment key={comment.id} comment={comment}/>)}
    </section>
  );
}
