import React, { useEffect, useState } from "react";
import { tripDetail } from "../api";
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
      alert(error.data.message);
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
        { trip.candidates.lenght
          ? trip.candidates.map((candidate) => (
            <article className="candidate" key={candidate.id}>
              <h3>{candidate.name}</h3>
              <p>{`${candidate.age} anos`}</p>
              <p>{candidate.country}</p>
              <p>{candidate.profession}</p>
              <p>{candidate.applicationText}</p>
            </article>
          ))
          : <Error message="Não há candidato pendente"/>}
      </section>
      <h3>Candidatos Aprovados</h3>
      <section className="approved">
        {trip.approved.lenght
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
