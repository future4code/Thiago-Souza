import { useHistory } from "react-router-dom";

export function useCoodinator() {
  const history = useHistory();

  function goToLogin() {
    history.push("/login");
  }

  function goToCadastro() {
    history.push("/cadastro");
  }

  function goToFeed() {
    history.push("/feed");
  }

  function goToPost(postID) {
    history(`/post/${postID}`);
  }

  return {
    goToLogin,
    goToCadastro,
    goToFeed,
    goToPost
  };
}
