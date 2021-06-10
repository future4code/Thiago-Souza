import { useState } from "react";

export default function useForm(initialValues) {
  const [ form, setForm ] = useState(initialValues);

  function onChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  }

  return {
    form,
    onChange
  };
}
