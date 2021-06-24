import React from "react";
import { useGlobalStates } from "../global/GlobalStates";
import Post from "./Post";

export default function Posts() {
  const { posts, loading, error } = useGlobalStates();

  if (loading)
    return <p>Carregando Os Posts</p>;

  if (error)
    return <p>Ocorreu Um Erro Ao Pegar Os Posts</p>;

  return (
    <section className="posts">
      {posts.map((post) => <Post key={post.id} post={post}/>)}
    </section>
  );
}
