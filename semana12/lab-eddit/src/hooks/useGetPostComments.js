import { useInfiniteQuery } from "react-query";
import { getPostComments, getToken } from "../api";

export default function useGetPostComments(id) {
  const {
    data,
    error,
    status,
    isFetching,
    refetch,
    fetchNextPage,
    hasNextPage
  } = useInfiniteQuery(
    [ "comments", id ],
    async ({ pageParam }) => (await getPostComments(id, getToken(), pageParam)).data,
    {
      getNextPageParam: (lastPage, pages) => {
        if (!lastPage.length)
          return false;

        return pages.length + 1;
      }
    }
  );

  return {
    comments:              data?.pages.flatMap((page) => page) || [],
    loading:               status === "loading",
    refetch:               status !== "loading" && isFetching,
    fetchNextPageComments: fetchNextPage,
    hasMoreComments:       hasNextPage,
    error,
    getComments:           refetch
  };
}

