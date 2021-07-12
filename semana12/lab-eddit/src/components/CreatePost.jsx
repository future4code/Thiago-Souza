import React from "react";
import useCreatePost from "../hooks/useCreatePost";

export default function CreatePost() {
  const {
    submitForm, form, handleChange, sending
  } = useCreatePost();

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
      <p>{sending && "Criando Post"}</p>
    </form>
  );
}
