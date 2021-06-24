import { useEffect, useState } from "react";
import { getPosts, getToken } from "../api";

export default function useGetPosts() {
  const [ posts, setPosts ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const [ refetch, setRefetch ] = useState(false);
  const [ error, setError ] = useState("");

  async function getPostsFromAPI() {
    setLoading(true);
    if (posts.length)
      setRefetch(true);

    const token = getToken();

    if (!token)
      return setLoading(false);

    try {
      const response = await getPosts(token);
      setPosts(response.data);
    } catch (error) {
      setError(error.response.data || "erro fora da api");
    } finally {
      setRefetch(false);
      setLoading(false);
    }
  }

  /*eslint-disable-next-line react-hooks/exhaustive-deps*/
  useEffect(() => getPostsFromAPI(), []);

  return {
    posts,
    loading,
    refetch,
    error,
    getPosts: getPostsFromAPI
  };
}
