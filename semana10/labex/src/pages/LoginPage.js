import React from "react";
import { useHistory } from "react-router-dom";
import { goToAdminPage, goToHomePage, goToTripsCreate } from "../controls";

export default function LoginPage() {
  const history = useHistory();

  return (
    <>
      <header>
        <p>LoginPage</p>
      </header>
      <main className="home">
        <button onClick={() => goToHomePage(history)}>
          Página Inicial
        </button>
        <button onClick={() => goToAdminPage(history)}>
          Ver Viagens No Sistema
        </button>
        <button onClick={() => goToTripsCreate(history)}>
          Criar Viagem
        </button>
      </main>
    </>
  );
}
