import React from "react";
import { useGlobalGetters, useGlobalStates } from "../global/GlobalStates";
import Post from "./Post";

export default function Posts() {
  const {
    posts, loading, refetch, error, hasMorePosts
  } = useGlobalStates();
  const { fetchNextPagePost } = useGlobalGetters();

  if (loading)
    return <p>Carregando Os Posts</p>;

  if (error)
    return <p>Ocorreu Um Erro Ao Pegar Os Posts</p>;

  let textLoadMore = "Carregar Mais Posts";

  if (refetch)
    textLoadMore = "Carregando Posts";
  else if (!hasMorePosts)
    textLoadMore = "Não Há Mais Posts";

  return (
    <section className="posts">
      {refetch && <p>Recarregando Posts</p>}
      {posts.map((post) => <Post key={post.id} post={post}/>)}
      <button onClick={fetchNextPagePost} disabled={refetch || !hasMorePosts}>
        {textLoadMore}
      </button>
    </section>
  );
}
