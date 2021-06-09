import React from "react";
import { useHistory } from "react-router-dom";
import { goToAdminPage, goToHomePage } from "../controls";
import useProtectedPage from "../hooks/useProtectedPage";

export default function CreateTripPage() {
  const history = useHistory();

  useProtectedPage();

  return (
    <>
      <header>
        <p>CreateTripPage</p>
      </header>
      <main className="home">
        <button onClick={() => goToHomePage(history)}>
          Ir Para Página Inicial
        </button>
        <button onClick={() => goToAdminPage(history)}>
          Ir Para Página Do Adm
        </button>
      </main>
    </>
  );
}
