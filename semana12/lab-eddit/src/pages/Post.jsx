import React from "react";
import { useParams } from "react-router-dom";
import { useGlobalStates } from "../global/GlobalStates";
import useProtectedPage from "../hooks/useProtectedPage";
import Post from "../components/Post";
import Comments from "../components/Comments";

function ShowPost(props) {
  const { posts, loading, error } = useGlobalStates();
  const post = posts.find((post) => post.id === props.id);

  if (loading)
    return <p>Carregando Post</p>;
  if (error || !post)
    return <p>Não Foi Possível Mostrar O Post</p>;

  return <Post post={post}/>;
}

export default function PostComments() {
  useProtectedPage();
  const { id } = useParams();

  return (
    <>
      <header>
        Post
      </header>
      <main className="Post">
        <ShowPost id={id}/>
        <Comments id={id}/>
      </main>
    </>
  );
}
