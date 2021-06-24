import { useEffect, useState } from "react";
import { getPostsComments, getToken } from "../api";

export default function useGetPostsComments(postID) {
  const [ comments, setComments ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState("");

  async function getPostsCommentsFromAPI(postID) {
    setLoading(true);
    const token = getToken();

    if (!token)
      return setLoading(false);

    try {
      const response = await getPostsComments(postID, token);
      setComments(response.data);
    } catch (error) {
      setError(error.response.data || "erro fora da api");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => getPostsCommentsFromAPI(postID), [ postID ]);

  return {
    comments,
    loading,
    error,
    getComments: getPostsCommentsFromAPI
  };
}

