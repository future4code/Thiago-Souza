import React, { useEffect, useState } from "react";
import { listTrips } from "../api";
import TripCard from "./TripCard";

export default function ListTrips() {
  const [ trips, setTrips ] = useState([]);

  async function listTripsFromApi() {
    try {
      setTrips((await listTrips()).data.trips || []);
    } catch (error) {
      alert(error.data.message);
    }
  }

  useEffect(() => listTripsFromApi(), []);

  return (
    <section className="trips">
      {trips.map((trip) => <TripCard trip={trip} key={trip.id}/>)}
    </section>
  );
}
