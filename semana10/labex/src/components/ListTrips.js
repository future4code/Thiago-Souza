import React, { useEffect, useState } from "react";
import { listTrips } from "../api";
import TripCard from "./TripCard";
import Loading from "./Loading";
import Error from "./Error";

export default function ListTrips() {
  const [ trips, setTrips ] = useState([]);
  const [ loading, setLoading ] = useState(true);

  async function listTripsFromApi() {
    setLoading(true);
    try {
      setTrips((await listTrips()).data.trips || []);
    } catch (error) {
      alert(error.data.message);
    }
    setLoading(false);
  }

  useEffect(() => listTripsFromApi(), []);

  if (!loading && !trips.length)
    return <Error message="Parece que não temos viagens disponíveis"/>;

  return (
    <section className="trips">
      {loading
        ? <Loading message="Carregando sua próxima viagem"/>
        : trips.map((trip) => <TripCard trip={trip} key={trip.id}/>)}
    </section>
  );
}
