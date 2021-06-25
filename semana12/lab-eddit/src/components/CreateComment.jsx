import React from "react";
import { usePostStates } from "../context/PostContext";
import useCreateComment from "../hooks/useCreateComment";

export default function CreatePost() {
  const { postID } = usePostStates();
  const {
    submitForm, form, handleChange, sending
  } = useCreateComment(postID);

  return (
    <form onSubmit={submitForm}>
      <label htmlFor="body">Texto</label>
      <input
        id="body"
        name="body"
        value={form.body}
        onChange={handleChange}
        required
      />
      <button>Postar</button>
      <p>{sending && "Criando Comentário"}</p>
    </form>
  );
}

