import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { tripDetail } from "../api";
import useProtectedPage from "../hooks/useProtectedPage";
import TripCard from "../components/TripCard";
import { goToAdminPage, goToHomePage, goToTripsCreate } from "../routes";

export default function TripDetailsPage() {
  useProtectedPage();
  const { id } = useParams();
  const [ trip, setTrip ] = useState({});

  async function tripDetailFromApi() {
    try {
      const token = localStorage.getItem("token");
      setTrip((await tripDetail(id, token)).data.trip);
    } catch (error) {
      alert(error.data.message);
    }
  }

  /*eslint-disable-next-line react-hooks/exhaustive-deps*/
  useEffect(() => tripDetailFromApi(), []);

  if (!trip.id)
    return (
      <>
        <header>
          TripDetailsPage
        </header>
        <main pending>
          <button onClick={() => goToHomePage(history)}>
            Página Inicial
          </button>
          <button onClick={() => goToAdminPage(history)}>
            Ver Viagens No Sistema
          </button>
          <button onClick={() => goToTripsCreate(history)}>
            Criar Viagem
          </button>
          <p>Carregando candidato</p>
        </main>
      </>
    );

  return (
    <>
      <header>
        TripDetailsPage
      </header>
      <main>
        <button onClick={() => goToHomePage(history)}>
          Página Inicial
        </button>
        <button onClick={() => goToAdminPage(history)}>
          Ver Viagens No Sistema
        </button>
        <button onClick={() => goToTripsCreate(history)}>
          Criar Viagem
        </button>
        <TripCard trip={trip}/>
        <section className="pending">
          {trip.candidates.map((candidate) => (
            <article className="candidate" key={candidate.id}>
              <h3>{candidate.name}</h3>
              <p>{`${candidate.age} anos`}</p>
              <p>{candidate.country}</p>
              <p>{candidate.profession}</p>
              <p>{candidate.applicationText}</p>
            </article>
          ))}
        </section>
        <section className="approved">
          {trip.approved.map((candidate) => (
            <article className="candidate" key={candidate.id}>
              <h3>{candidate.name}</h3>
            </article>
          ))}
        </section>
      </main>
    </>
  );
}
