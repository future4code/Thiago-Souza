import React, { useContext } from "react";
import useGetPostsComments from "../hooks/useGetPostsComments";
import { PostContext } from "./contexts";
import { useGlobalStates } from "./GlobalStates";

export default function PostStates(props) {
  const {
    comments,
    loading: loadingComments,
    error: errorComments,
    getComments
  } = useGetPostsComments(props.id);

  const {
    posts,
    loading: loadingPost,
    error: errorPost,
    getPosts
  } = useGlobalStates();

  const post = posts.find((post) => post.id === props.id);

  const states = {
    postID: props.id,
    post:   {
      data:    post,
      loading: loadingPost,
      error:   errorPost
    },
    comments: {
      data:    comments,
      loading: loadingComments,
      error:   errorComments
    }
  };
  const getters = {
    getComments,
    getPosts
  };

  return (
    <PostContext.Provider
      value={{
        states,
        getters
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
}

export function usePost() {
  return useContext(PostContext);
}

export function usePostStates() {
  return usePost().states;
}

export function usePostGetters() {
  return usePost().getters;
}

