import { useEffect, useState } from "react";
import { getPosts, getToken } from "../api";

export default function useGetPosts() {
  const [ posts, setPosts ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState("");

  async function getPostsFromAPI() {
    setLoading(true);
    const token = getToken();

    if (!token)
      return setLoading(false);

    try {
      const response = await getPosts(token);
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
    error,
    getPosts: getPostsFromAPI
  };
}
