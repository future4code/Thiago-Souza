import React from "react";
import { useGlobalStates } from "../global/GlobalStates";
import Post from "./Post";

export default function Posts() {
  const {
    posts, loading, refetch, error
  } = useGlobalStates();

  if (loading && !refetch)
    return <p>Carregando Os Posts</p>;

  if (error)
    return <p>Ocorreu Um Erro Ao Pegar Os Posts</p>;

  return (
    <section className="posts">
      {refetch && <p>Recarregando Posts</p>}
      {posts.map((post) => <Post key={post.id} post={post}/>)}
    </section>
  );
}
