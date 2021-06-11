import React from "react";
import { useHistory } from "react-router-dom";
import { goToAdminPage, goToHomePage } from "../routes";
import useProtectedPage from "../hooks/useProtectedPage";
import CreateTrip from "../components/CreateTrip";

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
        <CreateTrip/>
      </main>
    </>
  );
}
