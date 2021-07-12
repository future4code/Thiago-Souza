import { useHistory } from "react-router-dom";

export default function useCoodinator() {
  const history = useHistory();

  function goToLogin() {
    history.push("/");
  }

  function goToCadastro() {
    history.push("/cadastro");
  }

  function goToFeed() {
    history.push("/feed");
  }

  function goToPost(postID) {
    history.push(`/post/${postID}`);
  }

  return {
    goToLogin,
    goToCadastro,
    goToFeed,
    goToPost
  };
}
