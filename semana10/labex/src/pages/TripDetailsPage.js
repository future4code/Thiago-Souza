import React from "react";
import { useHistory, useParams } from "react-router-dom";
import useProtectedPage from "../hooks/useProtectedPage";
import Header from "../components/Header";
import TripDetails from "../components/TripDetail";

export default function TripDetailsPage() {
  useProtectedPage();
  const history = useHistory();
  const { id } = useParams();

  return (
    <>
      <Header history={history} homepage adminpage tripscreate logout/>
      <main className="trip-details">
        <TripDetails id={id}/>
      </main>
    </>
  );
}
