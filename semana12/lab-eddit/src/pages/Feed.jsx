import React from "react";
import Posts from "../components/Posts";
import CreatePost from "../components/CreatePost";
import useProtectedPage from "../hooks/useProtectedPage";

export default function Feed() {
  useProtectedPage();

  return (
    <>
      <header>
        Feed
      </header>
      <main className="Feed">
        <CreatePost/>
        <Posts/>
      </main>
    </>
  );
}
