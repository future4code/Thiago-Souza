import React from "react";
import Posts from "../components/Posts";
import CreatePost from "../components/CreatePost";
import useProtectedPage from "../hooks/useProtectedPage";
import Logout from "../components/Logout";

export default function Feed() {
  useProtectedPage();

  return (
    <>
      <header>
        <h1>Feed</h1>
        <Logout/>
      </header>
      <main className="Feed">
        <CreatePost/>
        <Posts/>
      </main>
    </>
  );
}
