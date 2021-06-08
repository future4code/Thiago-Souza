import React from "react";
import { useHistory } from "react-router-dom";
import { goToHomePage, goToTripsList } from "../controls";

export default function ApplicationFormPage() {
  const history = useHistory();

  return (
    <>
      <header>
        <p>ApplicationFormPage</p>
      </header>
      <main className="home">
        <button onClick={() => goToHomePage(history)}>
          Página Inicial
        </button>
        <button onClick={() => goToTripsList(history)}>
          Ver Viagens Disponíveis
        </button>
      </main>
    </>
  );
}
