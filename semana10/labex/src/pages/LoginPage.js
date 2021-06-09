import React from "react";
import { useHistory } from "react-router-dom";
import { login } from "../api";
import { goToHomePage, goToPage } from "../routes";
import useHandleInput from "../hooks/useHandleInput";

export default function LoginPage() {
  const history = useHistory();
  const [ email, onChangeEmail ] = useHandleInput();
  const [ password, onChangePassword ] = useHandleInput();

  async function goToAdim(page) {
    if (!email)
      return alert("Digite um email");

    if (!password)
      return alert("Digite uma senha");

    const body = {
      email,
      password
    };

    try {
      const response = await login(body);
      localStorage.setItem("token", response.data.token);
      goToPage(page, history);
    } catch (error) {
      localStorage.setItem("token", "");
      alert(error.response.data.message);
    }
  }

  return (
    <>
      <header>
        <p>LoginPage</p>
      </header>
      <main className="home">
        <form>
          <label htmlFor="email">E-mail</label>
          <input
            type="text"
            name="email"
            id="email"
            value={email}
            onChange={onChangeEmail}
          />
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={onChangePassword}
          />
        </form>
        <button onClick={() => goToHomePage(history)}>
          Página Inicial
        </button>
        <button onClick={() => goToAdim("AdminPage", history)}>
          Ver Viagens No Sistema
        </button>
        <button onClick={() => goToAdim("TripsCreate", history)}>
          Criar Viagem
        </button>
      </main>
    </>
  );
}
