import React from "react";
import { useHistory } from "react-router-dom";
import useProtectedPage from "../hooks/useProtectedPage";
import CreateTrip from "../components/CreateTrip";
import Navigation from "../components/Navigation";

export default function CreateTripPage() {
  const history = useHistory();

  useProtectedPage();

  return (
    <>
      <header>
        <p>CreateTripPage</p>
        <Navigation history={history} homepage adminpage logout/>
      </header>
      <main className="home">
        <CreateTrip/>
      </main>
    </>
  );
}
