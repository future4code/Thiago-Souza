import React from "react";
import { useParams } from "react-router-dom";
import useProtectedPage from "../hooks/useProtectedPage";
import Post from "../components/Post";
import Comments from "../components/Comments";
import PostStates, { usePostStates } from "../global/PostStates";

function ShowPost() {
  const { data, loading, error } = usePostStates().post;

  if (loading)
    return <p>Carregando Post</p>;
  if (error || !data)
    return <p>Não Foi Possível Mostrar O Post</p>;

  return <Post post={data}/>;
}

export default function PostComments() {
  useProtectedPage();
  const { id } = useParams();

  return (
    <>
      <header>
        Post
      </header>
      <PostStates id={id}>
        <main className="Post">
          <ShowPost/>
          <Comments/>
        </main>
      </PostStates>
    </>
  );
}
