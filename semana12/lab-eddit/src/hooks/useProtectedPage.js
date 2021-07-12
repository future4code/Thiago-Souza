import { useLayoutEffect } from "react";
import { getToken } from "../api";
import { useGlobalGetters } from "../context/GlobalContext";
import useCoodinator from "../hooks/useCoordinator";

export default function useProtectedPage() {
  const { goToLogin } = useCoodinator();
  const { getPosts } = useGlobalGetters();

  useLayoutEffect(() => {
    if (!getToken())
      goToLogin();

    getPosts();
  }, []);/*eslint-disable-line react-hooks/exhaustive-deps -- causa loop infinito*/
}
