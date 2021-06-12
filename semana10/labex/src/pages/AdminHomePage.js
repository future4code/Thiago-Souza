import React from "react";
import { useHistory } from "react-router-dom";
import Navigation from "../components/Navigation";
import useProtectedPage from "../hooks/useProtectedPage";
import ListTripsAdmin from "../components/ListTripsAdmin";

export default function AdminHomePage() {
  useProtectedPage();
  const history = useHistory();

  return (
    <>
      <header>
        <p>AdminHomePage</p>
        <Navigation history={history} homepage tripscreate/>
      </header>
      <main className="admin-page">
        <ListTripsAdmin/>
      </main>
    </>
  );
}
