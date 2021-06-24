import React from "react";
import useProtectedPage from "../hooks/useProtectedPage";

export default function Post() {
  useProtectedPage();

  return (
    <>
      <header>
        Post
      </header>
      <main className="Post">
        Post
      </main>
    </>
  );
}
