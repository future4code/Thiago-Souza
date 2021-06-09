import React from "react";
import { useHistory } from "react-router-dom";
import { goToLogin, goToTripsList } from "../routes";

export default function HomePage() {
  const history = useHistory();

  return (
    <>
      <header>
        <p>HomePage</p>
      </header>
      <main className="home">
        <button onClick={() => goToTripsList(history)}>
          Escolha A Sua Próxima Viagem
        </button>
        <button onClick={() => goToLogin(history)}>
          Gerenciamento De Viagens
        </button>
      </main>
    </>
  );
}
