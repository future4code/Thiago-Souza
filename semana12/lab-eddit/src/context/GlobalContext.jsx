import React, { createContext, useContext } from "react";
import useGetPosts from "../hooks/useGetPosts";

export const Context = createContext();

export default function GlobalContext(props) {
  const {
    posts,
    loading,
    refetch,
    error,
    getPosts,
    hasMorePosts,
    fetchNextPagePost
  } = useGetPosts();

  const states = {
    posts,
    loading,
    hasMorePosts,
    refetch,
    error
  };
  const getters = {
    getPosts,
    fetchNextPagePost
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

export function useGlobal() {
  return useContext(Context);
}

export function useGlobalStates() {
  return useGlobal().states;
}

export function useGlobalGetters() {
  return useGlobal().getters;
}
