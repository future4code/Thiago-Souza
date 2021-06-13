import React from "react";
import { useHistory } from "react-router-dom";
import Header from "../components/Header";
import useProtectedPage from "../hooks/useProtectedPage";
import ListTripsAdmin from "../components/ListTripsAdmin";

export default function AdminHomePage() {
  useProtectedPage();
  const history = useHistory();

  return (
    <>
      <Header history={history} homepage tripscreate logout/>
      <main className="admin-page">
        <ListTripsAdmin/>
      </main>
    </>
  );
}
