import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { goToHomePage, goToTripDetails, goToTripsCreate } from "../routes";
import useProtectedPage from "../hooks/useProtectedPage";
import { listTrips } from "../api";

export default function AdminHomePage() {
  useProtectedPage();
  const history = useHistory();
  const [ trips, setTrips ] = useState([]);

  async function listTripsFromApi() {
    try {
      setTrips((await listTrips()).data.trips || []);
    } catch (error) {
      alert(error.data.message);
    }
  }

  function viewDetails(tripID) {
    goToTripDetails(history, tripID);
  }

  useEffect(() => listTripsFromApi(), []);

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
        <section className="trips">
          {trips.map((trip) => (
            <article
              className="trip"
              key={trip.id}
              onClick={() => viewDetails(trip.id)}
            >
              <h3>{trip.name}</h3>
            </article>
          ))}
        </section>
      </main>
    </>
  );
}
