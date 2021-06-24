import React from "react";
import { useParams } from "react-router-dom";
import useProtectedPage from "../hooks/useProtectedPage";
import Post from "../components/Post";
import Comments from "../components/Comments";
import CreatePost from "../components/CreateComment";
import PostStates, { usePostStates } from "../global/PostStates";
import Logout from "../components/Logout";

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
        <h1>Post</h1>
        <Logout/>
      </header>
      <PostStates id={id}>
        <main className="Post">
          <ShowPost/>
          <CreatePost/>
          <Comments/>
        </main>
      </PostStates>
    </>
  );
}
