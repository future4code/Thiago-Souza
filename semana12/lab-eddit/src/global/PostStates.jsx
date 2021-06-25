import React, { useContext } from "react";
import useGetPostComments from "../hooks/useGetPostComments";
import { PostContext } from "./contexts";
import { useGlobalGetters, useGlobalStates } from "./GlobalStates";

export default function PostStates(props) {
  const {
    getComments,
    fetchNextPageComments,
    comments,
    ...restComments
  } = useGetPostComments(props.id);

  const { posts, ...restPosts } = useGlobalStates();
  const gettersPosts = useGlobalGetters();

  const post = posts.find((post) => post.id === props.id);

  const states = {
    postID: props.id,
    post:   {
      data: post,
      ...restPosts
    },
    comments: {
      data: comments,
      ...restComments
    }
  };

  const getters = {
    getComments,
    fetchNextPageComments,
    ...gettersPosts
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

