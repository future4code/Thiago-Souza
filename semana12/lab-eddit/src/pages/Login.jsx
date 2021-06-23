import React from "react";
import useForm from "../hooks/useForm";
import { useCoodinator } from "../hooks/useCoordinator";

export default function Login() {
  const { form, clearForm, handleChange } = useForm({
    email:    "",
    password: ""
  });

  const { goToCadastro } = useCoodinator();

  async function submitForm(event) {
    event.preventDefault();
    console.log(form);
    clearForm();
  }

  return (
    <>
      <header>
        Login
      </header>
      <main className="Login">
        <form onSubmit={submitForm}>
          <label htmlFor="email">E-Mail</label>
          <input
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Digite Seu E-Mail"
            required
          />
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Digite Sua Senha"
            required
          />
          <button>
            Entrar
          </button>
          <button type="button" onClick={goToCadastro}>
            Cadastrar
          </button>
        </form>
      </main>
    </>
  );
}
