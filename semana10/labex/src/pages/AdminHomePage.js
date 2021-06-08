import React from "react";
import { useHistory } from "react-router-dom";
import { goToHomePage, goToTripsCreate } from "../controls";

export default function AdminHomePage() {
  const history = useHistory();

  return (
    <>
      <header>
        <p>AdminHomePage</p>
      </header>
      <main className="home">
        <button onClick={() => goToHomePage(history)}>
          Página Inicial
        </button>
        <button onClick={() => goToTripsCreate(history)}>
          Criar Viagem Nova
        </button>
      </main>
    </>
  );
}
