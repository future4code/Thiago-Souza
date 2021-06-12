import React from "react";
import { useHistory, useParams } from "react-router-dom";
import useProtectedPage from "../hooks/useProtectedPage";
import Navigation from "../components/Navigation";
import TripDetails from "../components/TripDetail";

export default function TripDetailsPage() {
  useProtectedPage();
  const history = useHistory();
  const { id } = useParams();

  return (
    <>
      <header>
        <p>TripDetailsPage</p>
        <Navigation history={history} homepage adminpage tripscreate logout/>
      </header>
      <main className="trip-details">
        <TripDetails id={id}/>
      </main>
    </>
  );
}
