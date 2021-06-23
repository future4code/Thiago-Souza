import { useState } from "react";

export default function useForm(initialValues) {
  const [ form, setForm ] = useState(initialValues);

  function handleChange(event) {
    const { value, name } = event.target;
    setForm({
      ...form,
      [name]: value
    });
  }

  function clearForm() {
    setForm(initialValues);
  }

  return {
    form,
    handleChange,
    clearForm
  };
}
