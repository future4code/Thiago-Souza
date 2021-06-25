import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { createPost, getToken } from "../api";
import useForm from "./useForm";

export default function useCreatePost() {
  const [ sending, setSending ] = useState(false);
  const queryCLient = useQueryClient();
  const { form, clearForm, handleChange } = useForm({
    title: "",
    body:  ""
  });

  const { mutate } = useMutation(
    (post) => createPost(post, getToken()),
    {
      onMutate: () => setSending(true),
      onError:  (error) => {
        const stringError = error.response?.data || "erro fora da api";
        alert(`Não foi possível fazer o post\n${stringError}`);
      },
      onSettled: () => {
        setSending(false);
        clearForm();
        queryCLient.invalidateQueries("posts");
      }
    }
  );

  function submitForm(event) {
    event.preventDefault();
    mutate(form);
  }

  return {
    form,
    handleChange,
    submitForm,
    sending
  };
}
