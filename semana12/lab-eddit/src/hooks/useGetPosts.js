import { useEffect, useState } from "react";
import { getPosts, getToken } from "../api";

export function useGetPosts() {
  const [ posts, setPosts ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState("");

  async function getPostsFromAPI() {
    try {
      setLoading(true);
      const response = await getPosts(getToken());
      setPosts(response.data);
    } catch (error) {
      setError(error.response.data || "erro fora da api");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => getPostsFromAPI(), []);

  return {
    posts,
    loading,
    error
  };
}
