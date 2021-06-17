import React from "react";
import { useHistory } from "react-router-dom";
import Header from "../components/Header";
import ListTrips from "../components/ListTrips";

export default function ListTripsPage() {
  const history = useHistory();

  return (
    <>
      <Header history={history} homepage tripsapplications/>
      <main className="list-trips">
        <ListTrips/>
      </main>
    </>
  );
}
