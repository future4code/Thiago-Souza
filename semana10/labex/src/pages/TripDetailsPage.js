import React from "react";
import { useHistory, useParams } from "react-router-dom";
import useProtectedPage from "../hooks/useProtectedPage";
import { goToAdminPage, goToHomePage, goToTripsCreate } from "../routes";
import TripDetails from "../components/TripDetail";

export default function TripDetailsPage() {
  useProtectedPage();
  const history = useHistory();
  const { id } = useParams();

  return (
    <>
      <header>
        <p>TripDetailsPage</p>
      </header>
      <main className="trip-details">
        <button onClick={() => goToHomePage(history)}>
          Página Inicial
        </button>
        <button onClick={() => goToAdminPage(history)}>
          Ver Viagens No Sistema
        </button>
        <button onClick={() => goToTripsCreate(history)}>
          Criar Viagem
        </button>
        <TripDetails id={id}/>
      </main>
    </>
  );
}
