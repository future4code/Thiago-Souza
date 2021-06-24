import React, { useContext } from "react";
import useGetPosts from "../hooks/useGetPosts";
import { GlobalContext } from "./contexts";

export default function GlobalStates(props) {
  const {
    posts,
    loading,
    refetch,
    error,
    getPosts,
    hasMorePost,
    fetchNextPagePost
  } = useGetPosts();

  const states = {
    posts,
    loading,
    hasMorePost,
    refetch,
    error
  };
  const getters = {
    getPosts,
    fetchNextPagePost
  };

  return (
    <GlobalContext.Provider
      value={{
        states,
        getters
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}

export function useGlobal() {
  return useContext(GlobalContext);
}

export function useGlobalStates() {
  return useGlobal().states;
}

export function useGlobalGetters() {
  return useGlobal().getters;
}
