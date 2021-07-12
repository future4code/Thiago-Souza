import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { createComment, getToken } from "../api";
import useForm from "./useForm";

export default function useCreateComment(postID) {
  const [ sending, setSending ] = useState(false);
  const queryCLient = useQueryClient();
  const { form, clearForm, handleChange } = useForm({ body: "" });

  const { mutate } = useMutation(
    (comment) => createComment(comment, postID, getToken()),
    {
      onMutate: () => setSending(true),
      onError:  (error) => {
        const stringError = error.response?.data || "erro fora da api";
        alert(`Não foi possível fazer o comentário\n${stringError}`);
      },
      onSettled: () => {
        setSending(false);
        clearForm();
        queryCLient.invalidateQueries("comments");
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

