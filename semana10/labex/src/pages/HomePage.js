import React from "react";
import { useHistory } from "react-router-dom";
import { goToAdminPage, goToTripsList } from "../routes";
import Header from "../components/Header";

export default function HomePage() {
  const history = useHistory();

  return (
    <div id="home">
      <Header noNav/>
      <main className="home">
        <button onClick={() => goToTripsList(history)}>
          Escolha A Sua Próxima Viagem
        </button>
        <button onClick={() => goToAdminPage(history)}>
          Gerenciamento De Viagens
        </button>
      </main>
    </div>
  );
}
