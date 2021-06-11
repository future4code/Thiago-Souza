import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { deleteTrip, listTrips } from "../api";
import { goToTripDetails, goToTripsCreate } from "../routes";
import Error from "./Error";
import Loading from "./Loading";

export default function ListTripsAdmin() {
  const [ trips, setTrips ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const history = useHistory();

  async function listTripsFromApi() {
    setLoading(true);
    try {
      setTrips((await listTrips()).data.trips || []);
    } catch (error) {
      alert(error.data.message);
    }
    setLoading(false);
  }

  function viewDetails(tripID) {
    goToTripDetails(history, tripID);
  }

  useEffect(() => listTripsFromApi(), []);

  async function removeTrip(tripID) {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await deleteTrip(tripID, token);
      await listTripsFromApi();
    } catch (error) {
      alert(`Não foi possível remover a viagem\n${error.data.message}`);
    }
    setLoading(false);
  }
  if (loading)
    return <Loading message="Carregando Viagens"/>;

  if (!loading && !trips.length)
    return (
      <Error message="Não tem viagem cadastrada no sistema, crie uma">
        <button onClick={() => goToTripsCreate(history)}>
          Criar Viagem
        </button>
      </Error>
    );

  return (
    <section className="trips">
      {trips.map((trip) => (
        <article
          className="trip"
          key={trip.id}
          onClick={() => viewDetails(trip.id)}
        >
          <h3>{trip.name}</h3>
          <button
            onClick={(event) => {
              event.stopPropagation(); removeTrip(trip.id);
            }}
          >
            Remover
          </button>
        </article>
      ))}
    </section>
  );
}
