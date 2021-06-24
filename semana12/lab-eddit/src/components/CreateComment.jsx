import React from "react";
import { createComment, getToken } from "../api";
import useForm from "../hooks/useForm";
import { usePostGetters, usePostStates } from "../global/PostStates";

export default function CreatePost() {
  const { getComments } = usePostGetters();
  const { postID } = usePostStates();
  const { form, clearForm, handleChange } = useForm({ body: "" });

  async function submitForm(event) {
    event.preventDefault();
    try {
      await createComment(form, postID, getToken());
      getComments();
      clearForm();
    } catch (error) {
      alert(`Não foi possível fazer o comentário\n${error.response.data}`);
    }
  }

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
    </form>
  );
}

