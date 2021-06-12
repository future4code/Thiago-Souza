import React from "react";
import {
  goToAdminPage,
  goToHomePage,
  goToTripsApplications,
  goToTripsCreate,
  goToTripsList
} from "../routes";

export default function Navigation(props) {
  const { history } = props;

  function logout() {
    localStorage.setItem("token", "");

    goToHomePage(props.history);
  }

  return (
    <nav>
      {props.homepage && (
        <button onClick={() => goToHomePage(history)}>
          Página Inicial
        </button>
      )}
      {props.tripslist && (
        <button onClick={() => goToTripsList(history)}>
          Ver Viagens Disponíveis
        </button>
      )}
      {props.tripsapplications && (
        <button onClick={() => goToTripsApplications(history)}>
          Aplicar Para Viagem
        </button>
      )}
      {props.adminpage && (
        <button onClick={() => goToAdminPage(history)}>
          Página Do Adm
        </button>
      )}
      {props.tripscreate && (
        <button onClick={() => goToTripsCreate(history)}>
          Criar Viagem
        </button>
      )}
      {props.logout && (
        <button onClick={logout}>
          Logout
        </button>
      )}
    </nav>
  );
}
