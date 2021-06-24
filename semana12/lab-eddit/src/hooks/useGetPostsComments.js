import { useEffect, useState } from "react";
import { getPostsComments, getToken } from "../api";

export default function useGetPostsComments(postID) {
  const [ comments, setComments ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const [ refetch, setRefetch ] = useState(false);
  const [ error, setError ] = useState("");

  async function getPostsCommentsFromAPI() {
    setLoading(true);
    if (comments.length)
      setRefetch(true);

    const token = getToken();

    if (!token)
      return setLoading(false);

    try {
      const response = await getPostsComments(postID, token);
      setComments(response.data);
    } catch (error) {
      setError(error.response.data || "erro fora da api");
    } finally {
      setRefetch(false);
      setLoading(false);
    }
  }

  /*eslint-disable-next-line react-hooks/exhaustive-deps*/
  useEffect(() => getPostsCommentsFromAPI(), []);

  return {
    comments,
    loading,
    refetch,
    error,
    getComments: getPostsCommentsFromAPI
  };
}

