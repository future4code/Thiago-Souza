import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { goToHomePage, goToTripsList } from "../routes";
import countries from "../utils/countries.json";
import { listTrips } from "../api";
import ApplicationForm from "../components/ApplicationForm";
import Loading from "../components/Loading";

export default function ApplicationFormPage() {
  const history = useHistory();
  const [ trips, setTrips ] = useState([]);
  const [ loading, setLoading ] = useState(true);

  async function listTripsFromApi() {
    setLoading(true);
    try {
      setTrips((await listTrips()).data.trips);
    } catch (error) {
      alert(`Não foi possível pegar a lista de viagens\n${error.data.message}`);
    }
    setLoading(false);
  }

  useEffect(() => listTripsFromApi(), []);

  return (
    <>
      <header>
        <p>ApplicationFormPage</p>
      </header>
      <main className="home">
        <button onClick={() => goToHomePage(history)}>
          Página Inicial
        </button>
        <button onClick={() => goToTripsList(history)}>
          Ver Viagens Disponíveis
        </button>
        { loading
          ? <Loading message="Carregando Sua Próxima Viagem"/>
          : <ApplicationForm countries={countries} trips={trips}/>}
      </main>
    </>
  );
}
