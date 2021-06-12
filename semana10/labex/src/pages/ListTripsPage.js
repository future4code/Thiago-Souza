import React from "react";
import { useHistory } from "react-router-dom";
import Navigation from "../components/Navigation";
import ListTrips from "../components/ListTrips";

export default function ListTripsPage() {
  const history = useHistory();

  return (
    <>
      <header>
        <p>ListTripsPage</p>
        <Navigation history={history} homepage tripsapplications/>
      </header>
      <main className="list-trips">
        <ListTrips/>
      </main>
    </>
  );
}
