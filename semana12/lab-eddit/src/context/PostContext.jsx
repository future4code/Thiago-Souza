import React, { createContext, useContext } from "react";
import useGetPostComments from "../hooks/useGetPostComments";
import { useGlobalGetters, useGlobalStates } from "./GlobalContext";

export const Context = createContext();

export default function PostContext(props) {
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
    <Context.Provider
      value={{
        states,
        getters
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export function usePost() {
  return useContext(Context);
}

export function usePostStates() {
  return usePost().states;
}

export function usePostGetters() {
  return usePost().getters;
}

