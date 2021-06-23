import React from "react";
import { singupUser } from "../api";
import { useCoodinator } from "../hooks/useCoordinator";
import useForm from "../hooks/useForm";

export default function Cadastro() {
  const { form, clearForm, handleChange } = useForm({
    username: "",
    email:    "",
    password: ""
  });

  const { goToLogin, goToFeed } = useCoodinator();

  async function submitForm(event) {
    try {
      event.preventDefault();
      const response = await singupUser(form);
      localStorage.setItem("token", response.data.token);
      clearForm();
      goToFeed();
    } catch (error) {
      alert(`Erro ao fazer cadastro\n${error.response?.data}`);
    }
  }

  return (
    <>
      <header>
        Cadastro
      </header>
      <main className="Cadastro">
        <form onSubmit={submitForm}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Digite Seu Username"
            required
          />
          <label htmlFor="email">E-Mail</label>
          <input
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Digite Seu E-Mail"
            type="email"
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
            Cadastrar
          </button>
          <button type="button" onClick={goToLogin}>
            Login
          </button>
        </form>
      </main>
    </>
  );
}
