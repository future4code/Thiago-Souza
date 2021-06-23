import React from "react";
import useForm from "../hooks/useForm";
import { useCoodinator } from "../hooks/useCoordinator";
import { loginUser } from "../api";

export default function Login() {
  const { form, clearForm, handleChange } = useForm({
    email:    "",
    password: ""
  });

  const { goToCadastro, goToFeed } = useCoodinator();

  async function submitForm(event) {
    try {
      event.preventDefault();
      const response = await loginUser(form);
      localStorage.setItem("token", response.data.token);
      clearForm();
      goToFeed();
    } catch (error) {
      alert(`Erro ao fazer o login\n${error.response?.data}`);
    }
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
