import React from "react";
import { useHistory } from "react-router-dom";
import { goToHomePage, goToTripsApplications } from "../routes";
import ListTrips from "../components/ListTrips";

export default function ListTripsPage() {
  const history = useHistory();

  return (
    <>
      <header>
        <p>ListTripsPage</p>
      </header>
      <main className="home">
        <button onClick={() => goToHomePage(history)}>
          Página Inicial
        </button>
        <button onClick={() => goToTripsApplications(history)}>
          Aplicar Para Viagem
        </button>
        <ListTrips/>
      </main>
    </>
  );
}
