import React from "react";
import { useHistory } from "react-router-dom";
import { goToHomePage, goToTripsCreate } from "../routes";
import useProtectedPage from "../hooks/useProtectedPage";
import ListTripsAdmin from "../components/ListTripsAdmin";

export default function AdminHomePage() {
  useProtectedPage();
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
          Criar Viagem
        </button>
        <ListTripsAdmin/>
      </main>
    </>
  );
}
