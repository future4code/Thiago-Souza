import React from "react";
import { useParams } from "react-router-dom";
import useProtectedPage from "../hooks/useProtectedPage";
import Comments from "../components/Comments";
import CreatePost from "../components/CreateComment";
import PostContext from "../context/PostContext";
import Logout from "../components/Logout";
import useCoodinator from "../hooks/useCoordinator";
import ShowPost from "../components/ShowPost";

export default function PostComments() {
  useProtectedPage();
  const { goToFeed } = useCoodinator();
  const { id } = useParams();

  return (
    <>
      <header>
        <button onClick={goToFeed}>
          Feed
        </button>
        <h1>Post</h1>
        <Logout/>
      </header>
      <PostContext id={id}>
        <main className="Post">
          <ShowPost/>
          <CreatePost/>
          <Comments/>
        </main>
      </PostContext>
    </>
  );
}
