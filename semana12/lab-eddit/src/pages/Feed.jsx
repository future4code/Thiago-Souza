import React from "react";
import Posts from "../components/Posts";
import CreatePost from "../components/CreatePost";

export default function Feed() {
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
