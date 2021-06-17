import React from "react";
import { useHistory } from "react-router-dom";
import useProtectedPage from "../hooks/useProtectedPage";
import CreateTrip from "../components/CreateTrip";
import Header from "../components/Header";

export default function CreateTripPage() {
  const history = useHistory();

  useProtectedPage();

  return (
    <>
      <Header history={history} homepage adminpage logout/>
      <main className="home">
        <CreateTrip/>
      </main>
    </>
  );
}
