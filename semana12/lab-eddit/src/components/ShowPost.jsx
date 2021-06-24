import React from "react";
import { usePostStates } from "../global/PostStates";
import Post from "./Post";

export default function ShowPost() {
  const {
    data, loading, refetch, error
  } = usePostStates().post;

  if (loading && !refetch)
    return <p>Carregando Post</p>;
  if (error || !data)
    return <p>Não Foi Possível Mostrar O Post</p>;

  return (
    <section>
      {refetch && <p>Recarregando Post</p>}
      <Post post={data}/>
    </section>
  );
}

