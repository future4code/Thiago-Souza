import { getPosts, getToken } from "../api";
import { useInfiniteQuery } from "react-query";

export default function useGetPosts() {
  const {
    data,
    error,
    status,
    isFetching,
    refetch,
    fetchNextPage,
    hasNextPage
  } = useInfiniteQuery(
    "posts",
    async ({ pageParam = 1 }) => (await getPosts(getToken(), pageParam)).data,
    {
      getNextPageParam: (lastPage, pages) => {
        if (!lastPage.length)
          return false;

        return pages.length + 1;
      }
    }
  );

  return {
    posts:             data?.pages.flatMap((page) => page) || [],
    loading:           status === "loading",
    refetch:           status !== "loading" && isFetching,
    fetchNextPagePost: fetchNextPage,
    hasMorePost:       hasNextPage,
    error,
    getPosts:          refetch
  };
}
