import { useLayoutEffect } from "react";
import { useHistory } from "react-router-dom";

export default function useProtectedPage() {
  const history = useHistory();

  useLayoutEffect(() => {
    const token = localStorage.getItem("token");
    if (!token)
      history.push("/login");
  }, [ history ]);
}
