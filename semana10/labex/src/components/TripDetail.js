import React, { useEffect, useState } from "react";
import { deciceCandidate, tripDetail } from "../api";
import Loading from "./Loading";
import Error from "./Error";
import TripCard from "./TripCard";

export default function TripDetails(props) {
  const [ trip, setTrip ] = useState({});
  const [ loading, setLoading ] = useState(true);

  async function tripDetailFromApi() {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      setTrip((await tripDetail(props.id, token)).data.trip);
    } catch (error) {
      alert(`Não foi possível pegar os detalhes da viagem\n${error.data.message}`);
    }
    setLoading(false);
  }

  async function approveCandidate(candidateID) {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await deciceCandidate(trip.id, candidateID, true, token);
      await tripDetailFromApi();
      alert("Candidato aprovado");
    } catch (error) {
      alert(`Não foi possível aprovar candidato\n${error.data.message}`);
    }
    setLoading(false);
  }

  async function disapproveCandidate(candidateID) {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await deciceCandidate(trip.id, candidateID, false, token);
      await tripDetailFromApi();
      alert("Candidato rejeitado");
    } catch (error) {
      alert(`Não foi possível rejeitar candidato\n${error.data.message}`);
    }
    setLoading(false);
  }

  /*eslint-disable-next-line react-hooks/exhaustive-deps*/
  useEffect(() => tripDetailFromApi(), []);

  if (loading)
    return <Loading message="Carregando Viagem"/>;

  if (!loading && !trip.name)
    return <Error message="Viagem Não encontrada"/>;

  return (
    <>
      <TripCard trip={trip}/>
      <h3>Candidatos Pendentes</h3>
      <section className="pending">
        { trip.candidates.length
          ? trip.candidates.map((candidate) => (
            <article className="candidate" key={candidate.id}>
              <h3>{candidate.name}</h3>
              <p>{`${candidate.age} anos`}</p>
              <p>{candidate.country}</p>
              <p>{candidate.profession}</p>
              <p>{candidate.applicationText}</p>
              <button onClick={() => approveCandidate(candidate.id)}>
                Aprovar
              </button>
              <button onClick={() => disapproveCandidate(candidate.id)}>
                Rejeitar
              </button>
            </article>
          ))
          : <Error message="Não há candidato pendente"/>}
      </section>
      <h3>Candidatos Aprovados</h3>
      <section className="approved">
        {trip.approved.length
          ? trip.approved.map((candidate) => (
            <article className="candidate" key={candidate.id}>
              <h3>{candidate.name}</h3>
            </article>
          ))
          : <Error message="Não há candidato aprovado"/>}
      </section>
    </>
  );
}
