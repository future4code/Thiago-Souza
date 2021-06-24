import React from "react";
import { createPost, getToken } from "../api";
import useForm from "../hooks/useForm";
import { useGlobalGetters } from "../global/GlobalStates";

export default function CreatePost() {
  const { getPosts } = useGlobalGetters();
  const { form, clearForm, handleChange } = useForm({
    title: "",
    body:  ""
  });

  async function submitForm(event) {
    event.preventDefault();
    try {
      await createPost(form, getToken());
      getPosts();
      clearForm();
    } catch (error) {
      alert(`Não foi possível fazer o post\n${error.response.data}`);
    }
  }

  return (
    <form onSubmit={submitForm}>
      <label htmlFor="title">Título</label>
      <input
        id="title"
        name="title"
        value={form.title}
        onChange={handleChange}
        required
      />
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
