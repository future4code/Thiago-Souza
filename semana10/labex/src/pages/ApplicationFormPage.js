import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import countries from "../utils/countries.json";
import { listTrips } from "../api";
import ApplicationForm from "../components/ApplicationForm";
import Loading from "../components/Loading";
import Header from "../components/Header";

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
      <Header history={history} homepage tripslist/>
      <main className="application-form">
        { loading
          ? <Loading message="Carregando Sua Próxima Viagem"/>
          : <ApplicationForm countries={countries} trips={trips}/>}
      </main>
    </>
  );
}
