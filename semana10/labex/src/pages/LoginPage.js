import React from "react";
import { useHistory } from "react-router-dom";
import { login } from "../api";
import { goToHomePage, goToPage } from "../routes";
import useForm from "../hooks/useForm";

export default function LoginPage() {
  const history = useHistory();
  const { form, onChange } = useForm({
    email:    "",
    password: ""
  });

  async function onSubmit(event) {
    event.preventDefault();

    const page = event.nativeEvent.submitter.name;

    try {
      const response = await login(form);
      localStorage.setItem("token", response.data.token);
      goToPage(page, history);
    } catch (error) {
      localStorage.setItem("token", "");
      alert(`Login não realizado com sucesso\n${error.response.data.message}`);
    }
  }

  return (
    <>
      <header>
        <p>LoginPage</p>
      </header>
      <main className="home">
        <form onSubmit={onSubmit}>
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            name="email"
            id="email"
            value={form.email}
            onChange={onChange}
            required
          />
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            name="password"
            id="password"
            value={form.password}
            onChange={onChange}
            required
          />
          <button type="button" onClick={() => goToHomePage(history)}>
            Página Inicial
          </button>
          <button name="AdminPage">
            Ver Viagens No Sistema
          </button>
          <button name="TripsCreate">
            Criar Viagem
          </button>
        </form>
      </main>
    </>
  );
}
