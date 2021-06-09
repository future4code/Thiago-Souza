import React from "react";
import { useHistory } from "react-router-dom";
import { goToAdminPage, goToHomePage } from "../routes";
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
          Página Inicial
        </button>
        <button onClick={() => goToAdminPage(history)}>
          Página Do Adm
        </button>
      </main>
    </>
  );
}
